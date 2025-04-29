import { v2 as cloudinary } from "cloudinary";
import genreModel from "../models/genreModel.js";

//add genre
export const addGenre = async (req, res) => {
    try {
        const { name, bgColour } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Please provide a name." });
        }
        const existingGenre = await genreModel.findOne({ name });
        if (existingGenre) {
            return res.status(409).json({ message: "Genre already exists." });
        }

        const genreData = { name, bgColour };
        const genre = await genreModel.create(genreData);

        if (!genre) {
            return res.status(500).json({ message: "Failed to create genre in the database." });
        }

        res.status(201).json({ message: "Genre successfully added!", data: genre });

    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};



// Get all genres 
export const getAllGenre = async (req, res) => {
    try {
        const allGenre = await genreModel.find().sort({ createdAt: -1 });
        if (allGenre.length < 1) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.status(200).json({ message: "Successfully fetched all genres", data: allGenre });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//get single genre
export const fetchSingleGenre = async (req, res) => {
    const id = req.params.id;
    const singleGenre = await genreModel.findById(id);
    if (!singleGenre) {
        return res.status(404).json({ message: "Genre not found" });
    }
    res.status(200).json({ message: "Successfully fetch the single genre", data: singleGenre });
}

//delete genre
export const deleteGenre = async (req, res) => {
    const id = req.params.id;
    const deleteGenre = await genreModel.findByIdAndDelete(id);
    if (!deleteGenre) {
        return res.status(404).json({ message: "Genre not found" });
    }
    res.status(200).json({ message: "Successfully delete the genre" })
}

//update genre
export const updateGenre = async (req, res) => {
    const id = req.params.id;
    const { name, bgColour } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (bgColour) updateData.bgColour = bgColour;
    const updatedGenre = await genreModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    );

    if (!updatedGenre) {
        return res.status(404).json({ message: "Genre not found" });
    }
    res.status(200).json({ message: "Genre updated successfully", data: updatedGenre });
};
