import db from "./db/sqlite";

const letters = [
  {
    id: "51672571",
    title: "Surat Tugas",
    category: "Kepegawaian",
    description: "Template surat tugas guru.",
    file: "surat-tugas.docx",
  },
  {
    id: "678asbajs",
    title: "Surat Undangan",
    category: "Administrasi",
    description: "Template surat undangan sekolah.",
    file: "surat-undangan.docx",
  },
];

const fields = [
  {
    letter_id: "51672571",
    field_name: "nomor_surat",
    label: "Nomor Surat",
    type: "text",
    placeholder: "001/SDN/2026",
    required: 1,
    sort_order: 1,
  },
  {
    letter_id: "678asbajs",
    field_name: "nama_sekolah",
    label: "Nama Sekolah",
    type: "text",
    placeholder: "SD Negeri 2 Sukaraja",
    required: 1,
    sort_order: 2,
  },
];

const insertLetter = db.prepare(`
INSERT OR IGNORE INTO letter
(
    id,
    title,
    category,
    description,
    file
)
VALUES
(
    @id,
    @title,
    @category,
    @description,
    @file
)
`);

const insertField = db.prepare(`
INSERT OR IGNORE INTO letter_field
(
    letter_id,
    field_name,
    label,
    type,
    placeholder,
    required,
    sort_order
)
VALUES
(
    @letter_id,
    @field_name,
    @label,
    @type,
    @placeholder,
    @required,
    @sort_order
)
`);

const transaction = db.transaction(() => {
  for (const item of letters) {
    insertLetter.run(item);
  }

  for (const item of fields) {
    insertField.run(item);
  }
});

transaction();

console.log("Seed completed.");
