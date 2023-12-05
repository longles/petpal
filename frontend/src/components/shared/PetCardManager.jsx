import { useEffect, useState } from "react";
import { petAPIService } from "../../services/petAPIService";
import PetCard from "./PetCard";


const defaultRenderFunc = (x) => {return <PetCard key={x.id} petId={x.id} data={x}/>}

const PetCardManager = ({filters, page, render = defaultRenderFunc}) => {
    const [pets, setPets] = useState([]);
    const petAPI = petAPIService();
    
    useEffect(() => {
         petAPI.getPetList(filters, page).then(response => {
            if (response.success){
                // petIDs is a list of fetched pet id
                setPets(response.data.results);
    
                // console.log(petIDs);
            }
         })
    }, [filters, page])

    return (<>
        {pets.map(x => render(x))}
    </>)
}

export default PetCardManager