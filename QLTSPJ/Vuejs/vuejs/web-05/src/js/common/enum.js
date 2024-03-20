export const MISAEnum = {
  FORM_MODE: {
    ADD: 0,
    UPDATE: 1,
    VIEW: 2,
  },
};
MISAEnum;
export default {
  // Mã phím
  KEY_CODE: {
    // Mã phím Enter
    ENTER: 13,
    // Mã phím Tab
    TAB: 9,
    // Mã phím Esc
    ESC: 27,
    // Mã phím Space
    SPACE: 32,
    // Mã phím Delete
    DELETE: 46,
    // Mã phím Backspace
    BACKSPACE: 8,
    // Mã phím Arrow Left
    ARROW_LEFT: 37,
    // Mã phím Arrow Up
    ARROW_UP: 38,
    // Mã phím Arrow Right
    ARROW_RIGHT: 39,
    // Mã phím Arrow Down
    ARROW_DOWN: 40,
    // Mã phím F1
    F1: 112,
    // Mã phím S
    S: 83,
    // Mã phím N
    N: 78,
    // Mã phím E
    E: 69,
    // Mã phím R
    R: 82,
    // Mã phím L
    L: 76,
    // Mã phím A
    A: 65,
    // Mã phím C
    C: 67,
  },
  // tên phím
  KEY_NAME: {
    S: "S",
    // s nếu không có shift
    s: "s",
    A: "A",
    // Esc
    Esc: "Escape",
    // Delete
    Delete: "Delete",
    // R
    R: "R",
    // E
    E: "E",
    // L
    L: "L",
    // f1
    F1: "F1",
  },
  KEY_DEFINE: {
    // Tổ hợp phím Ctrl + S : Cất
    CTRL_S: " (Ctrl + S)",
    // Tổ hợp phím Ctrl + shift + S : Cất và thêm mới
    CTRL_SHIFT_S: " (Ctrl + Shift + S)",
    // Tổ hợp phím Ctrl + alt + A : Thêm mới
    CTRL_ALT_A: " (Ctrl + Alt + A)",
    // Đóng
    CLOSE: " (Esc)",
    // F1
    F1: " (F1)",
  },
  // Mã loại thông báo
  ALERT_TYPE: {
    // Thông báo thành công
    SUCCESS: "success",
    // Thông báo lỗi
    ERROR: "error",
    // Thông báo cảnh báo
    WARNING: "warning",
    // Thông báo thông tin
    INFO: "info",
  },
  // Form mode
  FORM_MODE: {
    // Chế độ thêm mới
    ADD: "add",
    // Chế độ chỉnh sửa
    EDIT: "edit",
    // Chế độ Nhân bản
    DUPLICATE: "duplicate",
    // Null
    NULL: null,
  },
  // Hành động cất, hủy, xóa, nhân bản, lưu,...
  ACTION: {
    // Thêm mới
    ADD: "add",
    // Chỉnh sửa
    EDIT: "edit",
    // Xóa
    DELETE: "delete",
    // Xóa nhiều
    DELETE_MANY: "deleteMany",
    // Tìm kiếm
    SEARCH: "search",
    // Lưu
    SAVE: "save",
    // Cất và đóng form
    SAVE_AND_CLOSE: "saveAndClose",
    // Cất và thêm mới
    SAVE_AND_ADD: "saveAndAdd",
    // Hủy
    CANCEL: "cancel",
    // Đóng
    CLOSE: "close",
    // ngưng sử dụng
    INACTIVE: "inactive",
    // nhân bản
    DUPLICATE: "duplicate",
    // Reload dữ liệu
    RELOAD: "reload",
    // Xuất file
    EXPORT: "export",
    // Trợ giúp
    HELP: "help",
    // Null
    NULL: null,
    // Collapse thanh sidebar
    COLLAPSE: "collapse",
  },
  // Các thông báo lỗi của toast
  ICON: {
    ERROR: "error",
    SUCCESS: "success",
    WARNING: "warning",
    INFO: "info",
  },
  // MISA CODE RESPONSE
  MISA_CODE: {
    // Thành công
    SUCCESS: 200,
    // Thêm mới thành công
    CREATED: 201,
    // Thêm mới thành công
    NO_CONTENT: 204,
    // Lỗi validate
    VALIDATE: 400,
    // Lỗi không xác định
    ERROR: 500,
  },
  // Language
  LANGUAGE: {
    // Tiếng việt
    VI: "vi",
    // Tiếng anh
    EN: "en",
  },
};
