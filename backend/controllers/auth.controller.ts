import { Request, Response } from "express";
import { createToken } from "../utils/jwt";
import db from "../db/sqlite";
import { User } from "../types/user";

export function login(req: Request, res: Response) {
  const firebaseUser = req.firebaseUser!;

  const findUser = db
    .prepare(
      `
      SELECT *
      FROM users
      WHERE uid = ?
    `,
    )
    .get(firebaseUser.uid);

  if (!findUser) {
    db.prepare(
      `
      INSERT INTO users
      (
        uid,
        name,
        email,
        photo,
        provider
      )
      VALUES
      (
        @uid,
        @name,
        @email,
        @photo,
        @provider
      )
    `,
    ).run({
      uid: firebaseUser.uid,
      name: firebaseUser.name,
      email: firebaseUser.email,
      photo: firebaseUser.picture,
      provider: firebaseUser.firebase.sign_in_provider,
    });
  } else {
    db.prepare(
      `
      UPDATE users
      SET
        name=@name,
        email=@email,
        photo=@photo,
        provider=@provider,
        updated_at=CURRENT_TIMESTAMP
      WHERE uid=@uid
    `,
    ).run({
      uid: firebaseUser.uid,
      name: firebaseUser.name,
      email: firebaseUser.email,
      photo: firebaseUser.picture,
      provider: firebaseUser.firebase.sign_in_provider,
    });
  }

  const user = db
    .prepare(
      `
      SELECT
        id,
        uid,
        name,
        email,
        photo,
        provider
      FROM users
      WHERE uid = ?
    `,
    )
    .get(firebaseUser.uid) as User;

  const token = createToken({
    id: user.id,
    uid: user.uid,
    email: user.email,
  });

  return res.json({
    success: true,
    token,
    user,
  });
}
