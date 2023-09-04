const requestProd = async () => {
try {
      const response = await fetch("/src/assets/db/data.json");
      const data = await response.json();
      
      return data;
    } catch (error) {
        console.error(error)
    }
    
};

