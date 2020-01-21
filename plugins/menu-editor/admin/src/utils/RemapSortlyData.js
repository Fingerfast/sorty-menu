export const remapSortlyInput = databaseOutput => {
  return databaseOutput.map(row => {
    const {
      uuid,
      depth_order = 0,
      parent_uuid = null,
      name,
    } = row;

    return {
      id: uuid,
      index: depth_order,
      parentId: parent_uuid,
      name: name || 'Neni zadaný název',
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