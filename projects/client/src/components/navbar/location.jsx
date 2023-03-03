function Location(props) {
  const {name, value, onChange} = props;
  return (
    <>
      <div className="flex justify-center rounded-lg">
        <div className="pt-3 mb-4 xl:w-full ">
          <select name={name} value={value} onChange={onChange}>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Location;
