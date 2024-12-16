/* eslint-disable react/prop-types */
import { createContext, useContext, useState} from "react";
import PropTypes from "prop-types";
import { createProductRequest, getProductsRequest, 
    deleteProductRequest, getProductRequest, updateProductRequest, updateProductRequestNoUpdateImage} from "../api/movies";

const ProductsContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = ()=>{
    const context = useContext(ProductsContext)

    if(!context){
        throw new Error('UseAuth debe estar definifo en un contexto ');
    }
    return context;
}

export function ProductsProvider({children}){
    const [products,  setProducts] = useState([]);

    const createProduct = async (product)=>{
        try {
            await createProductRequest(product);
            getProducts();
        } catch (error) {
            console.log(error);
        }
       
        
    }
    const getProducts = async ()=>{
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
            
        } catch (error) {
            console.log(error);
        }
           
    }
    // funcion para eliminar un producto de la base de datos 
    const deleteProduct = async (id) =>{
      try {
        const res = await deleteProductRequest(id);
             // console.log(res.data);
             if(res.status === 200)
                setProducts(products.filter(product => product._id != id));
      } catch (error) {
        console.log(error)
        
      }
       
    }

    // funcion para obtener un producto por id de la base de datos 
    const getProduct = async(id)=>{
        try {
            const res = await getProductRequest(id)
           // console.log(res);
           return res.data
        } catch (error) {
            console.log(error)
        }
    }


    const updateProduct = async (id, product)=>{
        try {
           const res = await updateProductRequest(id, product)
           console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const updateProductNoUpdateImage = async (id, product)=>{
        try{
            const res = await updateProductRequestNoUpdateImage(id, product)
            console.log(res)

        } catch(error){
            console.log(error)
        }
    }
    
    return(
        <ProductsContext.Provider value={{
            products,
            createProduct,
            getProducts,
            deleteProduct,
            getProduct,
            updateProduct,
            updateProductNoUpdateImage
            
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

ProductsProvider.PropTypes ={
    children:PropTypes.any
}