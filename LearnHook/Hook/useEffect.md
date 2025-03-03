# Các kiến thức cần có để học useEffect:

    - Event: add / remove event listener.
    - Observer pattern: Subscribe / Unsubscribe
    - Closure:
    - Timer: setTimeout, setInterval, clearTimeout, clearInterval.
    - useState
    - mount / unmounted
    - ===
    - Call API

# Kiến thức sẽ làm:

1.  Update DOM: - F8 Blog Title

        ```jsx
            const Content = () => {
                const [title, setTitle] = useState("");
                useEffect(() => {
                    document.title = title;
                });

                return (
                    <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginLeft: 18 }}
                    />
                );
            };

        ```

2.  Call API:

    - Cách call api:

      ```jsx
      useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((response) => response.json())
          .then((post) => setPosts(post));
      }, []);
      ```

      ```jsx
      const Content = () => {
        const [title, setTitle] = useState("");
        const [posts, setPosts] = useState([]);
        const [type, setType] = useState("posts");

        useEffect(() => {
          fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then((response) => response.json())
            .then((post) => setPosts(post));
        }, [type]);

        return (
          <div>
            {tabs.map((tabs) => {
              return (
                <button
                  key={tabs}
                  style={type === tabs ? activeButton : normalButton}
                  onClick={() => setType(tabs)}
                >
                  {tabs}
                </button>
              );
            })}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginLeft: 18 }}
            />
            <ul>
              {posts.map((post) => {
                return <li key={post.id}>{post.title || post.name}</li>;
              })}
            </ul>
          </div>
        );
      };
      ```

3.  Listen DOM event:

    - Các listen DOM event trong component:
    - Các vấn đề có thể xảy ra: - Cách khắc phục: - Scroll

      ```jsx
      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY >= 200) {
            setShowGoToTop(true);
          } else {
            setShowGoToTop(false);
          }
        };
        window.addEventListener("scroll", handleScroll);
        //clean up function
        return () => {};
      }, []);
      ```

    - Resize

4.  Cleanup

    - Remove listener / Unsubscribe
    - Clear timer

# useEffect là gì:

        - Dùng khi muốn thực hiện các side effect.
        - Là khi có tác động đến dữ liệu làm thay đổi phần mềm.
        - Lấy tên hàm gọi trong phần thân của Component.

# Cú pháp:

        ```jsx
        useEffect(callback, [dependencies]);
        ```

        - callback: hàm. (bắt buộc phải có) dùng để thực hiện các side effects.
        - dependency: sự phụ thuộc về mặt dữ liệ u. (không nhất thiết phải có)

# Có 3 trường hợp dùng useEffect: (callback luôn được gọi sau khi component mount (trong 3 trường hợp))

        - Clean up function luôn được gọi sau khi component mounted.
        - Clean up function luôn được gọi trước khi component unmounted.
        - Clean up function luôn được gọi trước khi callback được gọi (trừ lần mounted).

        - Clean up function: Ngăn chặn rò rỉ bộ nhớ và các behaviors không mong muốn bằng cách dọn dẹp các effects trước khi một component unmounted hoặc trước khi effect tiếp theo chạy.

        ```jsx
        //clean up function
            return () => {};
        ```

1.  useEffect(callback):

        - Gọi callback mỗi khi component re-render.
        - Ít dùng trong thực tế.
        - Gọi callback mỗi khi component thêm element vào DOM.

        ```jsx
        useEffect(() => {
            document.title = title;
        });
        ```

2.  useEffect(callback, []):

        - Chỉ gọi callback 1 lần sau khi component mount.

        ```jsx
        useEffect(() => {
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((post) => setPosts(post));
        }, []);
        ```

3.  useEffect(callback, [deps]):

        - Deps đơn giản chỉ là biến, có thể là props từ ngoài truyền vào, hoặc là state đặt trong component.
        - Callback sẽ được gọi lại mỗi khi deps thay đổi.
        - Khi component re-render, thì useEffect sẽ check deps trước và sau render có thay đổi không, nếu khác -> gọi lại callback.

        ```jsx
        useEffect(() => {
            fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then((response) => response.json())
            .then((post) => setPosts(post));
        }, [type]);
        ```

# Tìm hiểu cách dùng setInterval và setTimeout trong React Component:

    - Cách dùng setInterval để làm ứng dụng đếm ngược:
    - Chú ý dùng clear up function để tránh tràn bộ nhớ (memory leak).

    ```jsx
        const [countdown, setCountdown] = useState(180);

        setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return (
            <Typography variant="h1" align="center">
            {countdown}
            </Typography>
        );
    ```
    - Dùng như này sẽ có ván đề: khi countdown thì số trả về một lúc sẽ bị đè mất.
    - Nguyên nhân: khi setInterval chạy lại thì setCountdown chạy lại làm re-render lại component
        => tạo 1 setInterval mới
            => nhiều setInterval chạy song song làm chèn số.

    - Dùng useEffect như sau:

    ```jsx
        useEffect(() => {
            const timer = setInterval(() => {
                setCountdown(countdown - 1);
                    console.log("countdown: ", countdown);
                }, 1000);
            return () => clearInterval(timer);
        }, [0]);
    ```

    - Dùng như này thì sẽ có vấn đề:
        + Vì hàm setInterval nằm trong hàm useEffect (chỉ chạy đúng 1 lần), nên biến countdown chỉ set đúng 1 lần nên sẽ k trả lại giá trị tiếp. (kiến thức Closure)

         -> Có 2 cách để xử lý:

            - Thay vì dùng biến useState, truyền callBack vào.

            ```jsx
            useEffect(() => {
                const timer = setInterval(() => {
                    setCountdown((prev) => prev - 1);
                    }, 1000);
                return () => clearInterval(timer);

            }, []);
            ```

            - Thay vì dùng setInterval, dùng setTimeout thì cách xử lý sẽ ngược lại
                -> Dùng biến useState.

            ```jsx
            useEffect(() => {
                const timer = setTimeout(() => {
                    setCountdown(countdown - 1);
                    }, 1000);
                return () => clearInterval(timer);

            }, [countdown]);
            ```
            - Làm như này, khi setCountdown set lại giá trị
                -> component re-render
                    -> countdown - 1 giá trị
                        -> dependencies thay đổi
                            -> gọi lại callback
                                -> setCountdown
                                    -> cứ sau 1s loop này sẽ chạy

    - Còn 1 cách nữa là dùng type-I của useEffect:

    ```jsx
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(countdown - 1);
            }, 1000);
        return () => clearInterval(timer); // sử dụng clear up function
    });
    ```

# useEffect with preview avatar:

1. Cách giải:

   ```jsx
   const [avatar, setAvatar] = useState();
   const handlePreviewAvatar = (e) => {
     const file = e.target.files[0];
     file.preview = URL.createObjectURL(file);
     console.log(file);
     setAvatar(file);
   };

   return (
     <>
       <input type="file" onChange={handlePreviewAvatar} />
       <div>{avatar && <img src={avatar.preview} alt="avatar" />}</div>
     </>
   );
   ```

2. Những vấn đề:

   - Thay ảnh mới nhưng ảnh cũ vẫn còn nằm trên bộ nhớ -> memory leak.

3. Cách khắc phục:

   ```jsx
   useEffect(() => {
     return () => {
       avatar && URL.revokeObjectURL(avatar.preview); //Phải check để tránh lỗi reading undefined
     };
   }, [avatar]);
   ```

   -> Sử dụng clean up function để xoá ảnh cũ khỏi bộ nhớ.

# useEffect with fake chat app:

    - Cách giải:

    Content.js

    ```jsx
    useEffect(() => {
        const handleComment = ({ detail }) => {
        console.log(detail);
        };
        window.addEventListener(`lesson-${lessonId}`, handleComment);
    }, [lessonId]);
    ```

    index.js

    ```jsx
    function emitComment(id) {
        setInterval(() => {
            window.dispatchEvent(
            new CustomEvent(`lesson-${id}`, {
                detail: `Nội dung comment của lesson ${id}`,
            })
            );
        }, 2000);
    }

    emitComment(1);
    emitComment(2);
    emitComment(3);
    ```

    - Vấn đề:
        + Chưa clean up được lần comment trước đó.

    - Giải quyết:

    ```jsx
    useEffect(() => {
        const handleComment = ({ detail }) => {
            console.log(detail);
        };
        window.addEventListener(`lesson-${lessonId}`, handleComment);

        return () => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment); //Thêm cleanup function
        };
    }, [lessonId]);
    ```
