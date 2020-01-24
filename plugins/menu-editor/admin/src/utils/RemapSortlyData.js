export const remapSortlyInput = databaseOutput => {
  console.log(databaseOutput)
  return databaseOutput.map(row => {
    const {
      id,
      child_index = 0,
      parent_id = null,
      page_id: { Name },
      page_id,
    } = row;
    return {
      id,
      index: child_index,
      parentId: parent_id,
      name: Name || '',
      page_id: page_id.id,
    };
  });
};

export const remapSortlyOutput = sortlyOutput => {
  return sortlyOutput.map(row => {
    const { id, index, parentId = null, name } = row;

    return {
      id,
      child_index: index,
      parent_id: parentId === 0 ? null : parentId,
      name,
    };
  });
};