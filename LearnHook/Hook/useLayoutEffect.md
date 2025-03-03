# useLayoutEffect là gì?

- là hook để xử lý side effect giống useEffect, nhưng khuyến khích dùng useEffect hơn.
- Khi nào mà có trường hợp useEffect không xử lý được thì dùng useLayoutEffect.
- Chỉ trường hợp hi hữu lắm mới sử dụng useLayoutEffect.

# Vấn đề của useEffect mà từ đó có thể dùng useLayoutEffect:

- Khi dùng useEffect để render UI mà gặp tình trạng bị chớp nháy dữ liệu => dùng useLayoutEffect.

# So sánh useLayoutEffect với useEffect:

- Đây là sự khác nhau giữa thứ tự hoạt động của 2 hook:

1. useEffect:

   - Cập nhật lại state.
   - Cập nhật lại DOM (mutated).
   - Render UI.
   - Gọi clean up func nếu deps thay đổi.
   - Gọi useEffect callback.

   -> useEffect thực hiện bất đồng bộ.

2. useLayoutEffect:

   - Cập nhật lại state.
   - Cập nhật lại DOM (mutated).
   - Gọi clean up func nếu deps thay đổi. (sync)
   - Gọi useLayoutEffect callback. (sync)
   - Render UI.

   -> useLayoutEffect thực hiện đồng bộ.

# Rất hiếm khi phải sử dụng useLayoutEffect
