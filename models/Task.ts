import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},{
    timestamps: true,
});

export default mongoose.models.Task ||
mongoose.model("Task", TaskSchema)