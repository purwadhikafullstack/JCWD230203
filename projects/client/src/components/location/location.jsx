function Location(props) {
  const {name, value, onChange, city} = props;
  return (
    <>
      <div className="flex justify-center rounded-lg">
        <div className="pt-3 mb-4 xl:w-full ">
          <select name={name} value={value} onChange={onChange} >
            {city ? city.map((value, idx) => {
              return (
                <>
                <option value={idx + 1} key={idx}>{value.city}</option>
                </>
              )
            })
            :
            "Loading.."
            }
            
          </select>
        </div>
      </div>
    </>
  );
}

export default Location;
