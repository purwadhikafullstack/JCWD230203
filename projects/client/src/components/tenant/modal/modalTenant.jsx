import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../loader/loader";

function ModalTenant(){
    let getTokenId = localStorage.getItem("tokenTid");
    const { register, handleSubmit, reset } = useForm({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [msg, setMsg] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    
    const navigate = useNavigate();
}