
// import cloudinary from "../utils/cloudinary.js";
// import Client from "../models/clientModel.js";

import Client from "../Models/ClientSchema.js"
import Contacts from "../Models/ContactFormModel.js";
import Subscriber from "../Models/SubscribeModel.js";
import Project from "../Models/ProjectModel.js"

export async function saveContactForm(req, res) {
    const {name, mobileNumber, city, email} = req.body;
    console.log(req.body)
    try {
        if(!name || !mobileNumber || !city || !email) {
            return res.json({
                success: false,
                message: "all fields required"
            })
        }

        const form = new Contacts({name, mobileNumber, city, email});

        await form.save();

        return res.json({
            success: true,
            message: "form submitted successfully"
        })
    }catch(e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
     
    
}

export async function getContacts(req, res) {
    try {
        // getall forms

        const forms = await Contacts.find().sort({createdAt: -1});

        return res.json({
            success: true,
            data: forms
        })
    } catch (error) {
        return res.json({
            success: false,
            message: e.message
        })
    }
}

export async function addSubscriber(req, res) {
    // console.log(req)
    const {email} = req.body;

    try {
        // getall forms
        const subs = new Subscriber({email});
        await subs.save();

        return res.json({
            success: true,
            message: "Subscribed succesfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: e.message
        })
    }
}

export async function getSubscribers(req, res) {
    try {
        // getall forms

        const subscribers = await Subscriber.find().sort({createdAt: -1});

        return res.json({
            success: true,
            data: subscribers
        })
    } catch (error) {
        return res.json({
            success: false,
            message: e.message
        })
    }
}

export async function addClient(req, res){
  try {
      console.log(req.file);
      const { name, description, designation } = req.body;

    if (!req.file || !name || !description || !designation) {
      return res.json({
        success: false,
        message: "All fields required",
      });
    }

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "clients",
    // });

    // Save to DB
    const client = new Client({
      image: req.file.path, //  Cloudinary URL
      name,
      description,
      designation,
    });

    await client.save();

    return res.json({
      success: true,
      message: "Client added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export async function getClients(req, res){
  try {
    const clients = await Client.find().sort({ createdAt: -1 });    
        return res.json({
            success: true,
            data: clients,
        });
    } 
    catch(e) {
        res.json({
            success:false,
            message:error.message
        })
    }
};

export async function uploadProject(req, res) {
    try {
        const {name, description} = req.body;
        
        if(!req.file || !name || !description) {
            return res.json({
                success: false,
                message: "All fields required"
            })
        }

        // const result = await cloudinary.uploader.upload(req.file.path, {
        //     folder: "projects",
        // });

        // Save to DB
        const project = new Project({
            image: req.file.path, 
            name,
            description,
        });

        await project.save();

        return res.json({
            success: true,
            message: "Project added successFully"
        })
    }
    catch(e) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

export async function getProjects(req, res) {
    try{
        const projects = await Project.find().sort({createdAt: -1});
        return res.json({
            success: true,
            data : projects
        })
    }catch(err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}

