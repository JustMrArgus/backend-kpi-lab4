const { Router } = require("express");

const {
  createRecord,
  getRecords,
  getRecordById,
  deleteRecord,
} = require("../controllers/record.controller");

const router = Router();

router.post("/", createRecord);
router.get("/", getRecords);
router.get("/:recordId", getRecordById);
router.delete("/:recordId", deleteRecord);

module.exports = router;
