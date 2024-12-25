const StatusService = require("../service/Status.service");

exports.getAllStatusController = async (req, res) => {
  try {
    const categories = await StatusService.getAllStatus();
    res.status(200).json({ message: "success", categories });
  } catch (error) {
    res.status(500).json({ message: error.message, categories: [] });
  }
};

exports.getOneStatusController = async (req, res) => {
  try {
    const Status = await StatusService.getOneStatus();
    res.status(200).json({ message: "Success", Status });
  } catch (error) {
    res.status(500).json({ message: error.message, Status: {} });
  }
};

exports.createStatusController = async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    res.status(400).json({ message: "Empty data" });
    return;
  }
  try {
    const Status = await StatusService.createStatus({
      name,
    });
    res.status(200).json({ message: "Success", Status });
  } catch (error) {
    res.status(500).json({ message: error.message, Status: {} });
  }
};

exports.deleteStatusController = async (req, res) => {
  const { id } = req.params;

  try {
    const countDeletedCategories = await StatusService.deleteStatus(id);
    if (countDeletedCategories > 0) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatusController = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name || name.trim() === "") {
    res.status(400).json({ message: "Empty data" });
    return;
  }
  try {
    const countUpdated = await StatusService.updateStatus(req.body, id);

    if (countUpdated > 0) {
      const Status = await StatusService.getOneStatus(id);

      res.status(200).json({ message: "Success", Status });
    } else {
      res.status(200).json({ message: "Fail" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, Status: {} });
  }
};
