//create a CRUD controller for const roomSchema = new mongoose.Schema({apartment: {type: mongoose.Schema.Types.ObjectId,ref: 'Apartment',required: true},roomID: {type: String,required: true  },  roomNumber: {    type: String,    required: true  },  size: {    type: Number,    required: true},  rentAmount: {    type: Number,    required: true  },  images: [{    url: {      type: String,      required: true    } }]});
import { Request, Response } from 'express';
import {Room,IRoom} from '../model/room';

export const createRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const newRoom: IRoom = await Room.create(req.body);
    res.status(201).json({newRoom});
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms: IRoom[] = await Room.find();
    res.status(200).json(rooms);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const room: IRoom | null = await Room.findById(id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRoomById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedRoom: IRoom | null = await Room.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoomById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await Room.findByIdAndRemove(id);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};