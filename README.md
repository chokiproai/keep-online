**English** · [Vietnamese](./README-VN.md)

<div align="center">
    <a name="readme-top"></a>

# Keep Online

**English** · [Vietnamese](./README-VN.md)

### Deploying with Replit

|           Deploy with Replit            |     
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
3. URL for continuous access 24 hours

- In index.js, from line 10 to 14, the URLs are defined in the urls array, used for continuous access throughout 24 hours. You can add more URLs to this array without any limit on the number. Each URL will be accessed in cycles, with a default of 2 minutes (120 seconds), but you can adjust this cycle according to your needs by changing the parameter in the setInterval function on line 42.

4. URLs pause access from 00:00 to 06:00

- In index.js, from line 23 to 26, the URLs are defined in the websites array, used for scheduled access. These URLs will pause access from 00:00 to 06:00. During this time, the application will not make any requests to the URLs in the websites array. At other times of the day, these URLs will be accessed normally. The access cycle for these URLs is also 2 minutes (120 seconds), and you can adjust it according to your needs by changing the parameter in the setInterval function on line 36.

## Application Platform

- Supports unlimited Node.js deployment. Does not support physical containers that are inactive.


## LICENSE

MIT © [LICENSE](./LICENSE).

</div>

<!-- LINK -->
[deploy-button-image]: https://img.shields.io/badge/Run_on_Repl.it-grey?logo=replit&size=large
[deploy-link]: https://repl.it/chokiproai/keep-online