import objectionSoftDelete from 'objection-js-soft-delete';

export const softDelete = objectionSoftDelete({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});
