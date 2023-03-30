class ApiURL {
    // User Login-Register
    static register = "/register";
    static login = "/login";
    static logout = "/logout";
    static getUserDetails(id){
        return "/user/" + id;
    }
    static updateUser(id){
        return "/user/" + id;
    }
    static deleteUser(id){
        return "/user/" + id;
    }

    // Folder APIs
    static addFolder = "/folder";
    static getFolders(userId){
        return "/folders/" + userId;
    }
    static updateFolder(id){
        return "/folder/" + id;
    }
    static deleteFolder(id){
        return "/folder/" + id;
    }
    static moveFolder(folderId){
        return "/moveToFolder/" + folderId;
    }

    // Organization APIs
    static addOrg = "/organization";
    static getOrgs(userId){
        return "/organizations/" + userId;
    }
    static updateOrg(id){
        return "/organization/" + id;
    }
    static deleteOrg(id){
        return "/organization/" + id;
    }
    static moveOrg(orgId){
        return "/moveToOrg/" + orgId;
    }

    // Item APIs
    static addItem = "/item";
    static getItemDetails(id){
        return "/item/" + id;
    }
    static getItems(userId){
        return "/items/" + userId;
    }
    static updateItem(id){
        return "/item/" + id;
    }
    static deleteItem(id){
        return "/item/" + id;
    }
    static deleteItems(userId){
        return "/items/" + userId;
    }
    static deletedItems(userId){
        return "/itemsDeleted/" + userId;
    }
    static restoreItem(id){
        return "/itemRestore/" + id;
    }

    // Export Items
    static getExportItems(userId){
        return "/itemsExport/" + userId;
    }
    static importItems(userId){
        return "/itemsImport/" + userId;
    }
    
}
export default ApiURL;