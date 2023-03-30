import { axiosOpen, axiosSecure } from "./axios";
import ApiURL from "./apiURL";
import { toast } from "react-toastify";
import { getUserID } from "../service";

// User APIs
export const register = async (myFormData, setOpenPopup) => {
    axiosOpen.post(ApiURL.register, myFormData)
        .then(response=>{
            if(response.data.success === true){
              setOpenPopup(false);
              toast.success("Registration Successful");
            }
            else{
              console.log(response.data);
              toast.error("Server is not responding");
            }
        })
        .catch(error=>{
            console.log(error);
            toast.error("Server is not responding");
        })
};

// Item APIs
export const addItem = async (formData, setOpenPopup, fieldValues, setstateValues, setItemsData) => {
    axiosSecure.post(ApiURL.addItem, formData)
    .then(response => {
        if(response.data.success){
            toast.success("Item Added Successfully");
            setItemsData(prevItemsData => [...prevItemsData, response.data.data]);
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error(error.response?.data?.message);
    })
    .finally(() => {
        setstateValues({...fieldValues});
        setOpenPopup(false);
    });
};

export const updateItem = async (itemId, myForm, setOpenPopup, setItemsData) => {
    axiosSecure.put(ApiURL.updateItem(itemId), myForm)
    .then(response => {
        if(response.data.success){
            toast.success("Updated Successfully");
            setItemsData(prevItemsData => prevItemsData.map(item => {
                if(item.id === itemId){
                  return response.data.data;
                }
                else{
                  return item;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error(error.response?.data?.message);
    })
    .finally(() => {
        setOpenPopup(false);
    });
};

export const restoreItem = async (itemId, setOpenPopup, setItemsData) => {
    axiosSecure.get(ApiURL.restoreItem(itemId))
    .then(response => {
        if(response.data.success){
            toast.success("Restored Successfully");
            setItemsData(prevItemsData => prevItemsData.map(item => {
                if(item.id === itemId){
                  return response.data.data;
                }
                else{
                  return item;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error(error.response?.data?.message);
    })
    .finally(() => {
        setOpenPopup(false);
    });
};

export const restoreSingleItem = async (itemId, setItemsData) => {
    axiosSecure.get(ApiURL.restoreItem(itemId))
    .then(response => {
        if(response.data.success){
            toast.success("Restored Successfully");
            setItemsData(prevItemsData => prevItemsData.map(item => {
                if(item.id === itemId){
                  return response.data.data;
                }
                else{
                  return item;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error(error.response?.data?.message);
    })
};

export const deleteItem = async (itemId, setOpenPopup, setItemsData) => {
    axiosSecure.delete(ApiURL.deleteItem(itemId))
    .then(response => {
        if(response.data.success){
            toast.success("Item Moved to Trash Successfully");
            setItemsData(prevItemsData => prevItemsData.map(item => {
                if(item.id === itemId){
                    return response.data.data;
                }
                else{
                    return item;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
    .finally(() => {
        setOpenPopup(false);
    });
};

export const deleteItems = async (selectedItems, setItemsData, setCheckAll, setSelectedItems) => {
    axiosSecure.post(ApiURL.deleteItems(getUserID()), {selectedItems})
    .then(response => {
        if(response.data.success){
            toast.success("Items Moved to Trash Successfully");
            let result = response.data.data;
            setItemsData(prevItemsData => prevItemsData.map(item => {
                const findItem = result.find(resultItem => resultItem.id === item.id);
                if(findItem){
                  return { ...item, ...findItem };
                }
                else{
                  return item;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
    .finally(() => {
        setCheckAll(false);
        setSelectedItems([]);
    });
};

export const deleteSingleItem = async (itemId, setItemsData) => {
    axiosSecure.delete(ApiURL.deleteItem(itemId))
    .then(response => {
        if(response.data.success){
            toast.success("Item Moved to Trash Successfully");
            setItemsData(prevItemsData => prevItemsData.map(item => {
                if(item.id === itemId){
                    return response.data.data;
                }
                else{
                    return item;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
};

export const permanentDeleteItems = async (selectedItems, setItemsData, setCheckAll, setSelectedItems) => {
    axiosSecure.post(ApiURL.deleteItems(getUserID()), {selectedItems})
    .then(response => {
        if(response.data.success){
            toast.success("Items Deleted Successfully");
            let result = response.data.data;
            setItemsData(prevItemsData => prevItemsData.filter(item =>
                !(result.includes(item.id))
            ));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
    .finally(() => {
        setCheckAll(false);
        setSelectedItems([]);
    });
};

export const permanentDeleteItem = async (itemId, setOpenPopup, setItemsData) => {
    axiosSecure.delete(ApiURL.deleteItem(itemId))
    .then(response => {
        if(response.data.success){
            toast.success("Deleted Successfully");
            setItemsData(prevItemsData => prevItemsData.filter(item =>
                item.id !== itemId
            ));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
    .finally(() => {
        setOpenPopup(false);
    });
};

export const permanentDeleteSingleItem = async (itemId, setItemsData) => {
    axiosSecure.delete(ApiURL.deleteItem(itemId))
    .then(response => {
        if(response.data.success){
            toast.success("Deleted Successfully");
            setItemsData(prevItemsData => prevItemsData.filter(item =>
                item.id !== itemId
            ));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
};

// Folder APIs
export const addFolder = async (myForm, setOpenAddModal, setFoldername, setFolderData) => {
    axiosSecure.post(ApiURL.addFolder, myForm)
    .then(response => {
        if(response.data.success){
            toast.success("Folder Added Successfully");
            setFolderData(prevFolderData => [...prevFolderData, response.data.data]);
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error(error.response?.data?.message);
    })
    .finally(() => {
        setFoldername('');
        setOpenAddModal(false);
    });
};

export const updateFolder = async (myForm, folderId, setOpenEditModal, setFoldername, setFolderData) => {
    axiosSecure.put(ApiURL.updateFolder(folderId), myForm)
    .then(response => {
        if(response.data.success){
            console.log(response.data);
            toast.success("Folder Updated Successfully");
            setFolderData(prevFolderData => prevFolderData.map(folder => {
                if(folder.id === folderId){
                  return response.data.data;
                }
                else{
                  return folder;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error(error.response.data.message);
    })
    .finally(() => {
        setFoldername('');
        setOpenEditModal(false);
    });
};

export const deleteFolder = async (folderId, setOpenEditModal, setFolderData) => {
    axiosSecure.delete(ApiURL.deleteFolder(folderId))
    .then(response => {
        if(response.data.success){
            toast.success("Deleted Successfully");
            setFolderData(prevFolderData => prevFolderData.filter(folder => 
                folder.id !== folderId
            ));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
    .finally(() => {
        setOpenEditModal(false);
    });
};

export const moveFolder = async (folderId, selectedItems, setOpenPopup, setSelectedItems, setCheckAll, setItemsData) => {
    axiosSecure.post(ApiURL.moveFolder(folderId), {selectedItems})
    .then(response => {
        if(response.data.success){
            toast.success("Items Moved Successfully");
            let result = response.data.data;
            setItemsData(prevItemsData => prevItemsData.map(item => {
                const findItem = result.find(resultItem => resultItem.id === item.id);
                if(findItem){
                  return { ...item, ...findItem };
                }
                else{
                  return item;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
    .finally(() => {
        setSelectedItems([]);
        setOpenPopup(false);
        setCheckAll(false);
    });
}

// Organization API
export const addOrg = async (myForm, setOpenAddModal, setOrgname, setEmail, setOrgData) => {
    axiosSecure.post(ApiURL.addOrg, myForm)
    .then(response => {
        if(response.data.success){
            toast.success("Organitation Added Successfully");
            setOrgData(prevOrgData => [...prevOrgData, response.data.data]);
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error(error.response?.data?.message);
    })
    .finally(() => {
        setOrgname('');
        setEmail('');
        setOpenAddModal(false);
    });
};

export const deleteOrg = async (orgId, setOpenEditModal, setOrgData) => {
    axiosSecure.delete(ApiURL.deleteOrg(orgId))
    .then(response => {
        if(response.data.success){
            toast.success("Successfully Left");
            setOrgData(prevOrgData => prevOrgData.filter(org => 
                org.id !== orgId
            ));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
    .finally(() => {
        setOpenEditModal(false);
    });
};

export const moveOrg = async (orgId, selectedItems, setOpenPopup, setSelectedItems, setCheckAll, setItemsData) => {
    axiosSecure.post(ApiURL.moveOrg(orgId), {selectedItems})
    .then(response => {
        if(response.data.success){
            toast.success("Items Moved Successfully");
            let result = response.data.data;
            setItemsData(prevItemsData => prevItemsData.map(item => {
                const findItem = result.find(resultItem => resultItem.id === item.id);
                if(findItem){
                  return { ...item, ...findItem };
                }
                else{
                  return item;
                }
            }));
        }
        else{
            toast.error(response.data.message);
        }
    })
    .catch(error => {
        toast.error("Server is not responding");
        console.log(error);
    })
    .finally(() => {
        setSelectedItems([]);
        setOpenPopup(false);
        setCheckAll(false);
    });
}