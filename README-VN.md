<div align="center">
    <a name="readme-top"></a>

# Keep online

**Vietnamese** · [English](./README.md)

### Deploying with Replit

|           Deploy with Replit            |     
| :-------------------------------------: |   
| [![][deploy-button-image]][deploy-link] |

<div align="center">
        Script này được xây dựng trên môi trường Node.js, thực hiện truy cập định kỳ vào các trang web, bao gồm cả chế độ truy cập liên tục và gián đoạn, nhằm đảm bảo container luôn hoạt động.
</div>

<div align="left">

## Hướng dẫn sử dụng

> # NOTE
> Thiết lập múi giờ  <a href="/.env">Env.Example</a>

--------------

1. Chạy trên container hoặc VPS có môi trường Node.js (cần tự cài đặt môi trường Node.js).
2. Tải lên các tệp `index.js` và `package.json` vào thư mục gốc của môi trường chạy.
3. URL để truy cập liên tục 24 giờ

- Trong index.js, từ dòng 10 đến 14 là các URL được định nghĩa trong mảng urls, dùng để truy cập liên tục trong suốt 24 giờ. Bạn có thể thêm nhiều URL khác vào mảng này mà không bị giới hạn số lượng. Mỗi URL sẽ được truy cập theo chu kỳ, mặc định là 2 phút (120 giây), nhưng bạn có thể điều chỉnh chu kỳ này theo nhu cầu của mình bằng cách thay đổi tham số trong hàm setInterval ở dòng 42.

4. URL tạm dừng truy cập từ 00:00 đến 06:00

- Trong index.js, từ dòng 23 đến 26 là các URL được định nghĩa trong mảng websites, dùng để truy cập theo lịch trình. Các URL này sẽ tạm dừng truy cập từ 00:00 đến 06:00. Trong khoảng thời gian này, ứng dụng sẽ không thực hiện bất kỳ yêu cầu nào đến các URL trong mảng websites. Các thời gian khác trong ngày, các URL này sẽ được truy cập bình thường. Chu kỳ truy cập cho các URL này cũng là 2 phút (120 giây), và bạn có thể điều chỉnh theo nhu cầu của mình bằng cách thay đổi tham số trong hàm setInterval ở dòng 36.

## Nền tảng áp dụng

- Hỗ trợ không giới hạn triển khai node.js. Không hỗ trợ các container ngừng hoạt động vật lý.

## LICENSE

MIT © [LICENSE](./LICENSE).

</div>

<!-- LINK -->
[deploy-button-image]: https://img.shields.io/badge/Run_on_Repl.it-grey?logo=replit&size=large
[deploy-link]: https://replit.com/login?source=%2Fgithub%2F*&goto=%2Fnew%2F%3FgithubRepo%3Dchokiproai%2Fkeep-online
