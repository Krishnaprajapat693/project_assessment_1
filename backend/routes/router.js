import express from "express";
import { upload } from "../Utils/multer.js";
import { addClient, addSubscriber, getClients, getContacts, 
        getProjects, getSubscribers, saveContactForm, uploadProject } from "../controllers/Project.js";

const router = express.Router();

// router.post("/upload", upload.single("image"), (req, res) => {
//   res.json({
//     success: true,
//     imageUrl: req.file.path,
//   });
// });

// router.post('/addclient', addClient);
router.post('/addclient', upload.single("image"), addClient);
router.post('/addproject', upload.single("image"), uploadProject);

router.post('/addcontactform', saveContactForm);
router.post('/addsubscriber', addSubscriber);

router.get('/getclients', getClients);
router.get('/getprojects', getProjects);
router.get('/getcontactforms', getContacts);
router.get('/getsubscribers', getSubscribers);

export default router;
