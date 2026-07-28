import { Request, Response } from "express";
import { randomUUID } from "crypto";

import db from "../db/sqlite";

export interface Letter {
  id: string;
  user_id: number;
  title: string;
  category: string;
  description: string;
  file: string;
  created_at: string;
  updated_at: string;
}

// Create
export const createLetter = (req: Request, res: Response) => {
  const { uid, title, category, description } = req.body;
  const file = req.file?.filename;

  if (!title || !category || !description || !file) {
    return res.status(400).json({
      message: "Semua field wajib diisi.",
    });
  }

  const id = randomUUID();

  db.prepare(
    `
        INSERT INTO letter
        (
            id,
            user_id,
            title,
            category,
            description,
            file
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `,
  ).run(id, uid, title, category, description, file);

  return res.status(201).json({
    message: "Template surat berhasil ditambahkan.",
    data: {
      id,
      title,
      category,
      description,
      file: file,
    },
  });
};

// Update
export const updateLetter = (req: Request, res: Response) => {
  const { id } = req.params;

  const { title, category, description } = req.body;

  const userId = req.user.id;

  const oldLetter = db
    .prepare(
      `
      SELECT *
      FROM letter
      WHERE id = ?
      AND user_id = ?
      `,
    )
    .get(id, userId) as Letter;

  if (!oldLetter) {
    return res.status(404).json({
      message: "Template surat tidak ditemukan.",
    });
  }

  const file = req.file ? req.file.filename : oldLetter.file;

  db.prepare(
    `
    UPDATE letter
    SET
      title = ?,
      category = ?,
      description = ?,
      file = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    AND user_id = ?
    `,
  ).run(
    title || oldLetter.title,
    category || oldLetter.category,
    description || oldLetter.description,
    file,
    id,
    userId,
  );

  const updatedLetter = db
    .prepare(
      `
      SELECT
        id,
        title,
        category,
        description,
        file,
        created_at,
        updated_at
      FROM letter
      WHERE id = ?
      `,
    )
    .get(id);

  return res.json({
    message: "Template surat berhasil diperbarui.",
    data: updatedLetter,
  });
};

// Get All / Search
export const getLettersPublic = (req: Request, res: Response) => {
  const search = (req.query.search as string)?.trim();

  if (!search) {
    const letters = db
      .prepare(
        `
                SELECT
                    id,
                    title,
                    category,
                    description,
                    file
                FROM letter
                ORDER BY title ASC
            `,
      )
      .all();

    return res.json(letters);
  }

  const letters = db
    .prepare(
      `
            SELECT
                id,
                title,
                category,
                description,
                file
            FROM letter
            WHERE
                title LIKE @search
                OR category LIKE @search
                OR description LIKE @search
            ORDER BY title ASC
        `,
    )
    .all({
      search: `%${search}%`,
    });

  return res.json(letters);
};

// Detail
export const getLetters = (req: Request, res: Response) => {
  const userId = req.user.id;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  // total data
  const total = db
    .prepare(
      `
      SELECT COUNT(*) as count
      FROM letter
      WHERE user_id = ?
      `,
    )
    .get(userId) as {
    count: number;
  };

  // ambil data
  const letters = db
    .prepare(
      `
      SELECT
        id,
        title,
        category,
        description,
        file,
        created_at,
        updated_at
      FROM letter
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ?
      OFFSET ?
      `,
    )
    .all(userId, limit, offset);

  return res.json({
    success: true,

    data: letters,

    pagination: {
      page,
      limit,
      total: total.count,
      totalPages: Math.ceil(total.count / limit),
    },
  });
};

export const deleteLetter = (req: Request, res: Response) => {
  const { id } = req.params;

  const userId = req.user.id;

  const letter = db
    .prepare(
      `
      SELECT *
      FROM letter
      WHERE id = ?
      AND user_id = ?
      `,
    )
    .get(id, userId);

  if (!letter) {
    return res.status(404).json({
      message: "Template surat tidak ditemukan.",
    });
  }

  db.prepare(
    `
    DELETE FROM letter
    WHERE id = ?
    AND user_id = ?
    `,
  ).run(id, userId);

  return res.json({
    message: "Template surat berhasil dihapus.",
  });
};
