import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy({ options }) {

    const [searchParams, setSearchParams] = useSearchParams();

    function handelOnChange(e) {
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams)
    }
    const sortBy = searchParams.get('sortBy') || ''

    return <Select type='white' options={options} value={sortBy} onChange={handelOnChange} />

}

export default SortBy