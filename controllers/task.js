import {
    ErrorHandler
} from "../middlewares/error.js";
import {
    Task
} from "../models/task.js";


export const newTask = async (req, res, next) => {
    try {
        const {
            title,
            description
        } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        })

        res.status(201).json({
            success: true,
            message: "Succesfully added task"
        })


    } catch (error) {
        return next(error);
    }



}

export const myTasks = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const tasks = await Task.find({
            user: userid
        })
        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        return next(error);
    }




}

export const updateTask = async (req, res, next) => {

    try {
        const {
            id
        } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            next(new ErrorHandler("Invalid Task", 404))
        }
        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated Succesfully"
        })


    } catch (error) {
        return next(error);
    }


}
export const deleteTask = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return next(new ErrorHandler("Task does not exist!!", 404))
        }

        task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted succesfully",
        })

    } catch (error) {
        return next(error);
    }


}