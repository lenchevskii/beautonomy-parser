**Beautonomy-parser**

Social networks content parser.

Project has the following architecture:

![](/docs/beautonomy_mining_scheme.jpg)

App usage:

```bash
git clone https://github.com/lenchevskii/beautonomy-parser.git

cd beautonomy-parser

npm ci
```

YouTube-DL usage:

```bash
youtube-dl --id --skip-download --write-description --write-info-json --write-annotations --write-all-thumbnails --write-sub --write-auto-sub <URL>
```

---

***Comments:***

1) [YouTube-DL](https://github.com/ytdl-org/youtube-dl) library have to be installed through the command:

    ```bash
    pip3 install --upgrade youtube-dl
    ```

    **Do not forget** (if the `sklearn` installation error occured):

    ```bash
    python -m pip install --upgrade pip
    ```

2) [AutSub](https://github.com/abhirooptalasila/AutoSub) project.

    **Do not forget:**

    ```bash
    mkdir audio output
    ```
