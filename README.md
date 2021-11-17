## Live Parser

Social networks content parser.

Project has the following architecture:

![](/docs/beautonomy.parser.scheme.jpg)

App usage:

```bash
git clone https://github.com/lenchevskii/beautonomy-parser.git

cd beautonomy-parser

npm ci
```

YouTube-DL usage:

```bash
youtube-dl --id --skip-download --write-description \ 
--write-info-json --write-annotations --write-all-thumbnails \
--write-sub --write-auto-sub <URL>
```

---

## Comments:

1) [YouTube-DL](https://github.com/ytdl-org/youtube-dl) library have to be installed through the command:

    ```bash
    pip3 install --upgrade youtube-dl
    ```

    **Do not forget** (if the `sklearn` installation error occured):

    ```bash
    python -m pip install --upgrade pip
    ```

2) [AutoSub](https://github.com/abhirooptalasila/AutoSub) project.

    **Do not forget:**

    ```bash
    mkdir audio output
    ```

3) [Alias Register](https://www.npmjs.com/package/module-alias) was used for the general utilities.

    E.g.: debug tracer:

    ```bash
    require('module-alias/register')

    const H = require('@general-helper')
    
    ...
    
    H.trace('smth', ['optional', 'comments', ...])     \\ add tracing function whenever you want to show the result 
                                                       \\ inside a call 
    ```

4) [DB extended charset](https://mathiasbynens.be/notes/mysql-utf8mb4).

    **Notice!**

    Whereas you use extended charset, you have to modify the configuration of the DB:
    
    ```bash
    sudo nano /etc/mysql/my.cnf

    [client]
    default-character-set = utf8mb4

    [mysql]
    default-character-set = utf8mb4
    
    [mysqld]
    character-set-client-handshake = FALSE
    character-set-server = utf8mb4
    collation-server = utf8mb4_unicode_ci
    ```

    Restart the system.

    Expected output:
    
    ```bash
    mysql> SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
    +--------------------------+--------------------+
    | Variable_name            | Value              |
    +--------------------------+--------------------+
    | character_set_client     | utf8mb4            |
    | character_set_connection | utf8mb4            |
    | character_set_database   | utf8mb4            |
    | character_set_filesystem | binary             |
    | character_set_results    | utf8mb4            |
    | character_set_server     | utf8mb4            |
    | character_set_system     | utf8               |
    | collation_connection     | utf8mb4_unicode_ci |
    | collation_database       | utf8mb4_unicode_ci |
    | collation_server         | utf8mb4_unicode_ci |
    +--------------------------+--------------------+
    10 rows in set (0.00 sec)
    ```

5) Initialize MYSQL DB (if this is a **child instance** - use **parent tables** from **parent server**):

    ```bash
    mysql> source [Absolute]/beautycrash-parser/youtube.table.sql;
    ```

6) Running on AWS:

    ```bash
    nohup npm start &
    ```

    **Do not forget about AWS S3 Credentials: `.aws/`**

7) If Error is occured on main server (like ```process node [HOME]/.../youtube.resolver.tool.js failed```) check ```youtube-dl``` version and reinstall:

    ```bash
    sudo apt purge youtube-dl
    sudo pip3 install youtube-dl
    sudo apt install youtube-dl
    ```

8) Before starting the servers clean Redis DB.

9) Count code lines in `source/`:

    ```bash
    find . -name '*.js' | xargs wc -l
    ```

10) `ssh` run
    
    ```bash
    sudo ssh -i Documents/beautonomy-staging-2.pem ubuntu@35.176.176.54
    ```

11) Tools env generator:

    Generate and write to the shell paths' aliases for tools presented.
    E.g.: `some.service.tool.js` which has path `/path/to/some.service.tool.js`, will be resolved as follows:

    ```bash
    /path/to/some.service.tool.js -> some_service
    ```

    Now, we can call the service from the environment:

    ```bash
    ~ node $some_service [--options]
    ```
    
12) Redis error:

    ```bash
    ../beautycrash-parser/node_modules/redis/index.js:859
            command_obj.callback(undefinedArgError);
                                ^
    ```

    ...means `.env` argument is missed.
