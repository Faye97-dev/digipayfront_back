export const filterToBool = (item, filter, keys) => {
  let res = true;
  for (var i = 0; i < keys.length; i++) {
    if (!res) {
      break;
    }

    if (keys[i].length === 1) {
      if (filter[keys[i][0]] !== undefined) {
        res = res && item[keys[i][0]] === filter[keys[i][0]];
      }
      /*console.log(
        keys[i].join("."),
        " : ",
        item[keys[i][0]],
        filter[keys[i][0]]
      );*/
    } else if (keys[i].length === 2) {
      if (filter[keys[i][1]] !== undefined) {
        res = res && item[keys[i][0]][keys[i][1]] === filter[keys[i][1]];
      }
    }
    //console.log(keys[i]);
  }
  //console.log(" debuging filter bool ", filter);
  return res;
};

export const searchToBool = (item, search, keys) => {
  search = search.replace(/[^a-zA-Z0-9-: ]/g, "");
  if (search === "") {
    return true;
  }

  let res = false;
  for (var i = 0; i < keys.length; i++) {
    if (res) {
      break;
    }
    if (keys[i].length === 1) {
      if (typeof item[keys[i][0]] === "string") {
        // hanlde other type int , float....
        res =
          res || item[keys[i][0]].toLowerCase().includes(search.toLowerCase());
      }
    } else if (keys[i].length === 2) {
      if (typeof item[keys[i][0]][keys[i][1]] === "string") {
        res =
          res ||
          item[keys[i][0]][keys[i][1]]
            .toLowerCase()
            .includes(search.toLowerCase());
      }
    }
  }
  return res;
  //item.nom.toLowerCase().includes(e.target.value.toLowerCase())
};
export const filterDataProcess = (filter) => {
  let keys = Object.keys({ ...filter });
  let newkeys = [
    ...keys.map((item) => {
      if (item.includes("#")) {
        //const temp = item.split("#");
        //temp[temp.length - 1]
        return item.split("#");
      } else {
        return [item];
      }
    }),
  ];

  let newFilter = {};
  for (var i = 0; i < keys.length; i++) {
    if (newkeys[i].length === 1) {
      newFilter[newkeys[i][0]] = filter[keys[i]];
    } else if (newkeys[i].length === 2) {
      newFilter[newkeys[i][1]] = filter[keys[i]];
    }
  }
  console.log("filter data transform  ", newFilter, newkeys);
  //console.log(filter, keys);
  return [newFilter, newkeys];
};

export const PaginateData = (data, rows) => {
  let counter = 0;
  let page = 1;
  let paginated = [];
  for (var i = 0; i < data.length; i++) {
    if (counter < rows) {
      counter += 1;
      paginated.push({ ...data[i], page });
    } else {
      counter = 1;
      page += 1;
      paginated.push({ ...data[i], page });
    }
  }
  //console.log(paginated);
  return [page, paginated];
};

const searchCurrentOption = (options, value) => {
  /* search current option item by a value */
  const result = options.filter((item) => item.value === value);
  return result.length === 0 ? null : result[0];
};

export const allCurrentOption = (options, filter) => {
  const keys = Object.keys({ ...filter });
  let result = {};

  for (var i = 0; i < keys.length; i++) {
    result[keys[i]] = searchCurrentOption(
      options[keys[i]].content,
      filter[keys[i]]
    );
  }
  console.log("current filter option ", result);
  return result;
};

export const allNull = (filter) => {
  const keys = Object.keys({ ...filter });
  let result = true;
  for (var i = 0; i < keys.length; i++) {
    result = filter[keys[i]] === null && result;
    if (!result) return false;
  }
  //console.log("All is null ", result);
  return result;
};

export const orderingData = (data, attribute, increment) => {
  /* fuction ording ( increment | decrement ) data by a list of attributes */
  const res = [
    ...data.sort((a, b) => {
      let textA = "";
      let textB = "";
      if (attribute.length === 1) {
        if (typeof a[attribute[0]] === "string") {
          textA = a[attribute[0]].toLowerCase();
          textB = b[attribute[0]].toLowerCase();
        }
      } else if (attribute.length === 2) {
        if (typeof a[attribute[0]][attribute[1]] === "string") {
          textA = a[attribute[0]][attribute[1]].toLowerCase();
          textB = b[attribute[0]][attribute[1]].toLowerCase();
        }
      }
      if (!increment) {
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      } else {
        return textA > textB ? -1 : textA < textB ? 1 : 0;
      }
    }),
  ];
  /*console.log(
    " ordering ",
    res.map((item) => item[attribute])
  );*/
  return res;
};

export const getHighlightedText = (text, search) => {
  //console.log(text);
  if (text === null) {
    return "";
  }
  if (search === "" || typeof text !== "string") {
    return text; // handle int and float
  }
  const cleanSearch = search.replace(/[^a-zA-Z0-9-: ]/g, "");
  const parts = text.split(new RegExp(`(${cleanSearch})`, "gi"));
  //console.log(parts, new RegExp(`(${cleanSearch})`, "gi"));
  return (
    <>
      {parts.map((p, index) => {
        if (p.toLowerCase() === cleanSearch.toLowerCase()) {
          return (
            <span
              key={index}
              style={{ backgroundColor: "#f4772e" }}
              className="text-white"
            >
              {p}
            </span>
          );
        } else {
          return p;
        }
      })}
    </>
  );
};
