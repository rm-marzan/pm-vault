import { axiosSecure } from "./axios";
import ApiURL from "./apiURL";
import { getUserID } from "../service";
import { toast } from "react-toastify";

export const getOrgAndFolderData = async (setOrgData, setFolderData, setLoading) => {
    try {
        const result = await axiosSecure.get(ApiURL.getUserDetails(getUserID()));
        setOrgData(result.data?.data?.organizations);
        setFolderData(result.data?.data?.folders);
        if(result){
            setLoading(false);
        }
    } catch (error) {
        console.error(error);
    }
};

export const getItemsData = async (setItemsData, setLoading) => {
    try {
        const result = await axiosSecure.get(ApiURL.getItems(getUserID()));
        setItemsData(result.data?.items);
        if(result){
            setLoading(false);
        }
    } catch (error) {
        console.error(error);
    }
};

export const getExportData = async () => {
    try {
        const result = await axiosSecure.get(ApiURL.getExportItems(getUserID()));
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const currentTime = new Date();
        const fileName = "export_" + currentTime.getTime() + ".csv";
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        toast.error("Server is not responding");
        console.error(error);
    }
};