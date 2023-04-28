import { Request, Response } from 'express'
import User, { IUser } from '../model/user'

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser: IUser = await User.create(req.body)
    res.status(201).json({ newUser })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find()
    res.status(200).json(users)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const user: IUser | null = await User.findById(id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    await User.findByIdAndRemove(id)
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
