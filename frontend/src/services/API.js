// api.js
const API_URL = import.meta.env.VITE_API_URL
export default {

  async login(data){
    try{
          await new Promise(resolve=>setTimeout(resolve,2000));
          const res=await fetch(`${API_URL}/utilisateur/login`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),       
          });
          if (!res.ok) return false;
          const result=await res.json()
           return result.success === true;

          
    }
    catch(err){
      console.error(err);
       return false;
    }
  },
async me() {
    try {
      const res = await fetch(`${API_URL}/utilisateur/me`, {
        credentials: "include",
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error("Erreur API.me:", err);
      return null;
    }
  },
  async logout(){
    try{
          //await new Promise(resolve=>setTimeout(resolve,2000));
          const res=await fetch(`${API_URL}/utilisateur/logout`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          });
          return(res.ok)

          
    }
    catch(err){
      console.error(err);
    }
  },

  async changePassword(idUser,mot_de_passe){
    try{
          await new Promise(resolve=>setTimeout(resolve,2000));
          const res=await fetch(`${API_URL}/utilisateur/${idUser}/password`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({mot_de_passe})      
          });
          return res.success
    }
    catch(err){
      console.log(err);
      
    }
  },


  //Récuperer tous les utilisateurs
  async getUsers() {
    try {
      const response = await fetch(`${API_URL}/utilisateur`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // utiliser response.ok (200-299) ou checker 200
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Récuperation d'utilisateurs echoué ${response.status} - ${text}`);
      }

      const data = await response.json(); // attendu
      // ton backend renvoie { data: utilisateurs, message: ... }
      return data; // retourne l'objet complet ou data.data selon préférence
    } catch (err) {
      console.error("API.getUsers error:", err);
      throw err;
    }
  },
//Ajouter un nouvel utlisateur
    async addUser(userData){
      try{
          await new Promise(resolve=>setTimeout(resolve,2000));
          await fetch(`${API_URL}/utilisateur/register`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),       
          });
      }
      catch(err){
        throw new Error(`Ajout du nouvel utilisateur a échoué : ${err}`);
      }
    },

  async deleteUser(idToDelete){
    try{
        await fetch(`${API_URL}/utilisateur/${idToDelete}`,{
        method:"DELETE"
      });
    }
    catch(err){
      console.log(err);
      
    }
  },


  async getMateriels() {
    try {
      const response = await fetch(`${API_URL}/materiel`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // utiliser response.ok (200-299) ou checker 200
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Récuperation de materiels echoué ${response.status} - ${text}`);
      }

      const materiels = await response.json(); // attendu
      return materiels; // retourne l'objet complet ou data.data selon préférence
    } catch (err) {
      console.error("API.getMateriels error:", err);
      throw err;
    }
  },


  async getListeMaterielsAgent(idAgent) {
    try {
      console.log(idAgent);
      
      const response = await fetch(`${API_URL}/materiel/${idAgent}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // utiliser response.ok (200-299) ou checker 200
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Récuperation des materiels de l'agent a echoué ${response.status} - ${text}`);
      }

      const materiels = await response.json(); // attendu
      return materiels; // retourne l'objet complet ou data.data selon préférence
    } catch (err) {
      console.error("API.getListeMateriels error:", err);
      throw err;
    }
  },


      async addMateriel(materielData){
      try{
          await new Promise(resolve=>setTimeout(resolve,2000));
          await fetch(`${API_URL}/materiel`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(materielData),       
          });
      }
      catch(err){
        console.log(err);
        
        throw new Error(`Ajout du nouveau materiel a échoué : ${err}`);
      }
    },
      async deleteMateriel(idToDelete){
    try{
        await fetch(`${API_URL}/materiel/${idToDelete}`,{
        method:"DELETE"
      });
    }
    catch(err){
      console.log(err);
      
    }
  },

        async modifMateriel(idToModif,newMateriel){
    try{
        await new Promise(resolve=>setTimeout(resolve,2000));
        await fetch(`${API_URL}/materiel/${idToModif}`,{
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMateriel),       
        
      });
    }
    catch(err){
      console.log(err);
      
    }
  },
      async reaffectMateriel(idTMateriel,nouvelUtilisateur){
    try{
        await new Promise(resolve=>setTimeout(resolve,2000));
        await fetch(`${API_URL}/materiel/${idTMateriel}/reaffect`,{
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouvelUtilisateur),       

      });
    }
    catch(err){
      console.log(err);
      
    }
  },


      async addSite(siteData){
      try{
          await new Promise(resolve=>setTimeout(resolve,2000));
          await fetch(`${API_URL}/site`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(siteData)       
          });
      }
      catch(err){
        console.log(err);
        
        throw new Error(`Ajout du nouveau materiel a échoué : ${err}`);
      }
    },
    async getSites() {
    try {
      const response = await fetch(`${API_URL}/site`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // utiliser response.ok (200-299) ou checker 200
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Récuperation de sites echoué ${response.status} - ${text}`);
      }

      const sites = await response.json(); // attendu
      return sites; // retourne l'objet complet ou data.data selon préférence
    } catch (err) {
      console.error("API.getSites error:", err);
      throw err;
    }
  },

      async deleteSite(idToDelete){
    try{
        await fetch(`${API_URL}/site/${idToDelete}`,{
        method:"DELETE"
      });
    }
    catch(err){
      console.log(err);
      
    }
  },

      async addAgent(agentData){
      try{
          await new Promise(resolve=>setTimeout(resolve,2000));
          await fetch(`${API_URL}/agent`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(agentData)       
          });
      }
      catch(err){
        console.log(err);
        
        throw new Error(`Ajout du nouveau agent a échoué : ${err}`);
      }
    },
    async getAgents() {
    try {
      const response = await fetch(`${API_URL}/agent`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // utiliser response.ok (200-299) ou checker 200
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Récuperation des agents a echoué ${response.status} - ${text}`);
      }

      const agents = await response.json(); // attendu
      return agents; // retourne l'objet complet ou data.data selon préférence
    } catch (err) {
      console.error("API.getAgents error:", err);
      throw err;
    }
  },
    async deleteAgent(idToDelete){
    try{
        await fetch(`${API_URL}/agent/${idToDelete}`,{
        method:"DELETE"
      });
    }
    catch(err){
      console.log(err);
      
    }
  },

      async getTypesMateriels() {
    try {
      const response = await fetch(`${API_URL}/type-materiel`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // utiliser response.ok (200-299) ou checker 200
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Récuperation des types matériels a echoué ${response.status} - ${text}`);
      }

      const agents = await response.json(); // attendu
      return agents; // retourne l'objet complet ou data.data selon préférence
    } catch (err) {
      console.error("API.getTypesAgents error:", err);
      throw err;
    }
  },


        async addTypeMateriel(typeMaterielData){
      try{
          await new Promise(resolve=>setTimeout(resolve,2000));
          await fetch(`${API_URL}/type-materiel`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(typeMaterielData)       
          });
      }
      catch(err){
        console.log(err);
        
        throw new Error(`Ajout du nouveau type de materiel a échoué : ${err}`);
      }
    },

    async deleteTypeMateriel(idToDelete){
    try{
        await fetch(`${API_URL}/type-materiel/${idToDelete}`,{
        method:"DELETE"
      });
    }
    catch(err){
      console.log(err);
      
    }
  },



  

};


