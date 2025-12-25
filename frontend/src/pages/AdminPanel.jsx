import { useEffect, useState } from "react";
import {
  FolderKanban,
  Users,
  MessageSquare,
  Mail,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import axios from "axios";
import { backendURL } from "../main";

/* ================= APP ================= */
export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (!showAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#e0e7ff,_#f8fafc)]">
        <button
          onClick={() => setShowAdmin(true)}
          className="px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 
          text-white rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition-all"
        >
          🚀 Launch Admin Dashboard
        </button>
      </div>
    );
  }

  return <AdminPanel />;
}

/* ================= ADMIN PANEL ================= */
function AdminPanel() {
  const [tab, setTab] = useState("projects");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-72 bg-indigo-950/90 backdrop-blur-xl text-white min-h-[calc(100vh-72px)] px-6 py-8 space-y-3">
          <p className="text-xs uppercase tracking-widest text-indigo-300 mb-6">
            Management
          </p>

          <NavButton
            icon={<FolderKanban />}
            label="Projects"
            active={tab === "projects"}
            onClick={() => setTab("projects")}
          />
          <NavButton
            icon={<Users />}
            label="Clients"
            active={tab === "clients"}
            onClick={() => setTab("clients")}
          />
          <NavButton
            icon={<MessageSquare />}
            label="Contacts"
            active={tab === "contacts"}
            onClick={() => setTab("contacts")}
          />
          <NavButton
            icon={<Mail />}
            label="Subscribers"
            active={tab === "subscribers"}
            onClick={() => setTab("subscribers")}
          />
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-10 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
          {tab === "projects" && <Projects />}
          {tab === "clients" && <Clients />}
          {tab === "contacts" && <Contacts />}
          {tab === "subscribers" && <Subscribers />}
        </main>
      </div>
    </div>
  );
}

/* ================= NAV BUTTON ================= */
function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all
      ${
        active
          ? "bg-gradient-to-r from-emerald-500 to-indigo-500 shadow-lg scale-[1.02]"
          : "text-indigo-200 hover:bg-indigo-800"
      }`}
    >
      <div className="p-2 bg-white/10 rounded-lg">{icon}</div>
      <span className="font-semibold">{label}</span>
    </button>
  );
}

/* ================= PROJECTS ================= */
function Projects() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((p) => ({ ...p, [name]: files ? files[0] : value }));
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.description || !formData.image) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("image", formData.image);

      const res = await axios.post(`${backendURL}/addproject`, data);
      if (res.data.success) {
        alert("Project Added");
        setFormData({ name: "", description: "", image: null });
      }
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Project Management">
      <Input label="Project Name" name="name" value={formData.name} onChange={handleChange} />
      <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
      <UploadBox file={formData.image} onChange={handleChange} />
      <PrimaryButton loading={loading} onClick={handleAdd} text="Add Project" />
    </Card>
  );
}

/* ================= CLIENTS ================= */
function Clients() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((p) => ({ ...p, [name]: files ? files[0] : value }));
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.designation || !formData.description || !formData.image) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));

      const res = await axios.post(`${backendURL}/addclient`, data);
      if (res.data.success) {
        alert("Client Added");
        setFormData({ name: "", designation: "", description: "", image: null });
      }
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Client Management">
      <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
      <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
      <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
      <UploadBox file={formData.image} onChange={handleChange} />
      <PrimaryButton loading={loading} onClick={handleAdd} text="Add Client" />
    </Card>
  );
}

/* ================= CONTACTS ================= */
function Contacts() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axios.get(`${backendURL}/getcontactforms`).then((res) => {
      if (res.data.success) setContacts(res.data.data);
    });
  }, []);

  return (
    <Card title="Contact Responses">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th>Name</th><th>Email</th><th>Mobile</th><th>City</th><th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id} className="bg-white hover:bg-indigo-50 rounded-lg">
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.mobileNumber}</td>
              <td>{c.city}</td>
              <td>
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => setContacts(contacts.filter((x) => x._id !== c._id))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* ================= SUBSCRIBERS ================= */
function Subscribers() {
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    axios.get(`${backendURL}/getsubscribers`).then((res) => {
      if (res.data.success) setSubs(res.data.data);
    });
  }, []);

  return (
    <Card title="Subscribers">
      {subs.map((s) => (
        <div key={s._id} className="flex justify-between bg-white p-4 rounded-xl mb-2">
          <span>{s.email}</span>
          <Trash2
            className="text-red-500 cursor-pointer"
            onClick={() => setSubs(subs.filter((x) => x._id !== s._id))}
          />
        </div>
      ))}
    </Card>
  );
}

/* ================= UI COMPONENTS ================= */
function Card({ title, children }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50" />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea {...props} className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50" />
    </div>
  );
}

function UploadBox({ file, onChange }) {
  return (
    <div className="relative border-2 border-dashed border-indigo-300 rounded-2xl p-8 text-center 
    bg-indigo-50 hover:border-indigo-500 transition">
      
      <Upload className="w-8 h-8 mx-auto text-indigo-500 mb-2" />

      <p className="text-sm text-gray-700">
        {file ? file.name : "Click to upload image"}
      </p>

      {/* 👇 IMPORTANT FIX */}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
}


function PrimaryButton({ text, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold"
    >
      {loading ? "Processing..." : text}
    </button>
  );
}
