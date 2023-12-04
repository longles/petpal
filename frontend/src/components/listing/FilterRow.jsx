const FilterRow = ({ name, options }) => {
    // Convert the label text to lowercase and replace spaces with underscores
    const filterKey = name.toLowerCase().replace(/ /g, '_');
  
    return (
      <div className="mb-3">
        <label htmlFor={filterKey} className="form-label">{name}</label>
        <select className="form-select" id={filterKey} name={filterKey}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
export default FilterRow;

