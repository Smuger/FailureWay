import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    severity: { type: Number, required: true },
    downtime: { type: Number, required: true },
    comment: { type: String },
    desc: { type: String },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const dataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    minor: { type: Number, required: true },
    major: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const serviceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    data: [dataSchema],
    report: [reportSchema],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
