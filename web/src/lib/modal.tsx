interface RowInfo<T> {
  row: T
  editModalIsOpen: boolean
  deleteModalIsOpen: boolean
}

export function NewRowInfos<T>(rows: T[]): RowInfo<T>[] {
  return rows.map((v) => ({
    row: v,
    editModalIsOpen: false,
    deleteModalIsOpen: false,
  }))
}

export function mapRowInfos<T>(
  rows: RowInfo<T>[],
  f: (row: T) => T
): RowInfo<T>[] {
  return rows.map((v) => ({
    row: f(v.row),
    editModalIsOpen: false,
    deleteModalIsOpen: false,
  }))
}

export function filterRowInfos<T>(
  rows: RowInfo<T>[],
  f: (row: T) => boolean
): RowInfo<T>[] {
  return rows.filter((v) => f(v.row))
}

export function setEditModalIsOpenForRowInfo<T>(
  rows: RowInfo<T>[],
  f: (row: T) => boolean,
  isOpen: boolean
): RowInfo<T>[] {
  return rows.map((v) =>
    f(v.row)
      ? {
          row: v.row,
          editModalIsOpen: isOpen,
          deleteModalIsOpen: false,
        }
      : v
  )
}

export function setDeleteModalIsOpenForRowInfo<T>(
  rows: RowInfo<T>[],
  f: (row: T) => boolean,
  isOpen: boolean
): RowInfo<T>[] {
  return rows.map((v) =>
    f(v.row)
      ? {
          row: v.row,
          editModalIsOpen: false,
          deleteModalIsOpen: isOpen,
        }
      : v
  )
}
