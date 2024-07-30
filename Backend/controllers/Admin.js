import UserModel from "../models/user.js";

const Getuser = async (req, res) => {
  try {
    const users = await UserModel.find().populate("role");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editUser = async (req, res) => {
  try{
    const userId = req.params.id;
    const {name,email,role} = req.body;
    const editevent = await UserModel.findByIdAndUpdate(userId,{name,email,role})
    res.status(200).json(editevent)
  }catch(error){
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const chechAdmin = await UserModel.findById(userId);

    if (chechAdmin.role == "admin") {
      return res.status(409).json({ message: "Cannot Delete Admin" });
    }

    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user delete successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
export { Getuser, deleteUser };
