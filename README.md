<div align="center">
    <a name="readme-top"></a>

# Keep Online

**English** · [Vietnamese](./README-VN.md)

|         Deploy with HuggingFace         |     
| :-------------------------------------: |   
| [![][deploy-button-image]][deploy-link] |

<div align="center">
        This script is built on a Node.js environment, performing periodic access to websites, including both continuous and intermittent access, to ensure the container remains active.
</div>

<div align="left">

## Usage Instructions

> # NOTE
> Set the time zone  <a href="/.env">Env.Example</a>

--------------

1. Run on a container or VPS with a Node.js environment (Node.js environment needs to be installed manually).
2. Upload the `index.js` and `package.json` files to the root directory of the running environment.
3. URLs for 24-hour continuous access

- In index.js, URLs are defined in the urls array, which is used for continuous access during 24 hours. You can add more URLs to this array without any limit. Each URL will be accessed periodically, with a default interval of 3 minutes (180 seconds). You can adjust this cycle according to your needs by changing the parameter in the setInterval function on line 86.

4. URLs for 00:00 to 06:00 pause

- In index.js, URLs are defined in the websites array, which is used for scheduled access. These URLs will be paused from 00:00 to 06:00. During this time, the application will not make any requests to the URLs in the websites array. At other times of the day, these URLs will be accessed normally. The access cycle for these URLs is also 3 minutes (180 seconds) and you can adjust it to your needs by changing the parameter in the setInterval function on line 73.

## Application Platform

- Supports unlimited Node.js deployment. Does not support physical containers that are inactive.

## LICENSE

MIT © [LICENSE](./LICENSE).

</div>

<!-- LINK -->
[deploy-button-image]: https://cdn-uploads.huggingface.co/production/uploads/65c33f0aa592fce762eed505/qpm9eCvzXeXp-3tKJVSqs.png
[deploy-link]: https://huggingface.co/spaces/ngoctuanai/keep-online?duplicate=true
