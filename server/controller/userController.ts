import { Request, Response } from 'express'
import RegisterRequest, {IRegisterRequest} from '../model/registerRequest'
import User, { IUser } from '../model/user'
import sendToken from '../utils/jwtToken'
import sendEmail from '../utils/sendEmail'





//registerRequest model using mongoose
export const registerRequestUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newRegisterRequest: IRegisterRequest = await RegisterRequest.create(req.body)
    res.status(201).json({ newRegisterRequest })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

//login user controller
export const loginUser = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    sendToken(user, 200, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//forgot password controller
export const forgotPassword = async (req: Request, res: Response):Promise<void> => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();

    // Update user document
    user.resetPasswordToken = resetToken;
    await user.save({validateBeforeSave: false});

    // Send reset password email
    await sendEmail({ 
      to: email,
      subject: "Password Reset Instructions",
      text: `Please use the following link to reset your password: /reset-password/${resetToken}`,
    });

    // ...

    // Return success response
    res.status(200).json({
      message: "Password reset instructions sent",
      resetToken,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



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
