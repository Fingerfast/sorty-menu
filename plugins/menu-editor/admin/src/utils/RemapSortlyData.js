export const remapSortlyInput = databaseOutput => {
  return databaseOutput.map(row => {
    const {
      id,
      child_index = 0,
      parent_id = null,
      name,
      page_id,
    } = row;

    return {
      id,
      index: child_index,
      parentId: parent_id,
      name: name || 'Neni zadaný název',
      page_id,
    };
  });
};

export const remapSortlyOutput = sortlyOutput => {
  return sortlyOutput.map(row => {
    const { id, index, parentId = null, name } = row;

    return {
      uuid: id,
      depth_order: index,
      parent_uuid: parentId === 0 ? null : parentId,
      name,
    };
  });
};