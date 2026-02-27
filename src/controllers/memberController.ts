import { Request, Response } from "express";
import Member from "../models/member";
import { MemberInput, Level, Subcircle } from "../types/member";

interface MemberQuery {
  subcircle?: Subcircle;
  level?: Level;
  search?: string;
}
interface MemberParams {
  id: string;
}
export async function getMembers(
  req: Request<{}, {}, {}, MemberQuery>,
  res: Response
): Promise<void> {
  try {
    const { subcircle, level, search } = req.query;

    const filter: {
      subcircle?: Subcircle;
      level?: Level;
      name?: { $regex: string; $options: string };
    } = {};

    if (subcircle) filter.subcircle = subcircle;
    if (level) filter.level = level;
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const members = await Member.find(filter);

    res.render("index", {
      members,
      search: search ?? "",
      subcircle: subcircle ?? "",
      level: level ?? ""
    });
  } catch {
    res.status(500).send("Error loading members");
  }
}

export async function addMember(
  req: Request<{}, {}, MemberInput>,
  res: Response
): Promise<void> {
  try {
    await Member.create(req.body);
    res.redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}

export async function editMember(
  req: Request<MemberParams, {}, MemberInput>,
  res: Response
): Promise<void> {
  try {
    await Member.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true
    });
    res.redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}

export async function deleteMember(
  req: Request<MemberParams>,
  res: Response
): Promise<void> {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
}