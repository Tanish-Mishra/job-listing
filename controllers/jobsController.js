const Job = require("./../models/Jobs");

const createJob = async (req, res, next) => {
  try {
    const {
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
    } = req.body;
    if (
      !companyName ||
      !title ||
      !description ||
      !logoUrl ||
      !salary ||
      !location ||
      !duration ||
      !locationType
    ) {
      res.status(400).json({ message: "Bad Request!" });
    }

    const newJob = new Job({
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
    });

    await newJob.save();
    res.status(201).json({ message: "Job Created Successfully!" });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      res.status(401).json({
        message: "Job Id Not Found",
      });
    }

    const jobDetail = await Job.findById(jobId);
    // const jobDetail = await Job.findById(jobId,{title:1}); // It will return only the title of the job first parameter is Id,projection then sorting and all
    res.status(200).json({
      job: jobDetail,
    });
  } catch (error) {
    next(error);
  }
};

const editJobById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const {
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
    } = req.body;
    if (
      !companyName ||
      !title ||
      !description ||
      !logoUrl ||
      !salary ||
      !location ||
      !duration ||
      !locationType
    ) {
      res.status(400).json({ message: "Bad Request!" });
    }

    await Job.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          title,
          description,
          logoUrl,
          salary,
          location,
          duration,
          locationType,
        },
      }
    );
    res.status(200).json({
      message: "Job Edited Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllJob = async (req, res, next) => {
  try {
    const title = req.query.title || "";
    const skills = req.query.skills || "";
    // const jobList = await Job.find({},{title: 1})
    const jobList = await Job.find(
      { title: { $regex: title, $options: "i" } },
      { title: 1, salary: 1, logoUrl: 1, location: 1 }
    );

    res.status(200).json({
      data: jobList,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createJob,
  getJobById,
  editJobById,
  getAllJob,
};
