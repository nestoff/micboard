# Configuration
Micboard stores its configuration in a json file.  On Mac OS X, `config.json` can be found in `~/Library/Application Support/micboard/`.  On Linux, it is typically located in `~/.local/share/micboard/`.  On first run, a default configuration file is copied to the configuration directory.  Exit micboard and add a 'slot' for each device.


## Initial Setup
Each wireless channel is assigned unique slot. A single channel QLXD receiver would use 1 slot while a ULXD4Q receiver uses 4.

In `config.json`, add a slot for each wireless device.

Each slot requires 4 parameters:
* **slot** - A unique slot number
* **ip** - the IP address of the receiver
* **channel** - the device channel on the receiver.  For example, the third channel of a ULXD receiver would be channel 3.  For single channel devices, like QLXD, use channel 1.
* **type** - the type of the receiver - `["uhfr", "qlxd", "ulxd", "axtd", "p10r"]`


```javascript
"slots": [
    {
      "slot": 1,
      "ip" : "192.0.2.11",
      "channel": 1,
      "type": "qlxd"
    },
    {
      "slot": 2,
      "ip" : "192.0.2.12",
      "channel": 1,
      "type": "qlxd"
    },
    {
      "slot": 3,
      "ip" : "192.0.2.13",
      "channel": 1,
      "type": "uhfr"
    },
    {
      "slot": 4,
      "ip" : "192.0.2.13",
      "channel": 2,
      "type": "uhfr"
    },
    {
      "slot": 5,
      "ip" : "192.0.2.14",
      "channel": 1,
      "type": "ulxd"
    },
    {
      "slot": 6,
      "ip" : "192.0.2.14",
      "channel": 2,
      "type": "ulxd"
    },
    {
      "slot": 7,
      "ip" : "192.0.2.14",
      "channel": 3,
      "type": "ulxd"
    },
    {
      "slot": 8,
      "ip" : "192.0.2.14",
      "channel": 4,
      "type": "ulxd"
    }
  ]
```

Save `config.json` and restart micboard.

## Keyboard Shortcuts
Micboard is primarily controlled with keyboard shortcuts

* <li><kbd>?</kbd> - Show keyboard shortcuts</li>
* <kbd>0</kbd> - Show all slots
* <kbd>1</kbd>...<kbd>9</kbd> - Load group
* <kbd>d</kbd> - Start demo mode
* <kbd>e</kbd> - Open group editor
* <kbd>t</kbd> - Toggle TV view
* <kbd>i</kbd> - Change tv display mode
* <kbd>f</kbd> - Toggle fullscreen
* <kbd>g</kbd> - Toggle image backgrounds
* <kbd>v</kbd> - Toggle video backgrounds
* <kbd>n</kbd> - Extended Name editor
* <kbd>q</kbd> - Show QR code
* <kbd>esc</kbd> - reload micboard

## Groups
Devices can be grouped into custom views. These groups are accessible from the menu and keyboard shortcuts.  

#### View a Group
Groups can be selected from the main menu or with numeric keys.  View all devices by pressing <kbd>0</kbd>.

#### Edit a Group

<p align="center">
  <img src="img/editor.png">
</p>
Once in a group, open the group editor by pressing "edit group" in the nav menu.  The group editor can also be opened by pressing <kbd>e</kbd>.

Once the editor is open -
1. Add title
2. Drag and channels from sidebar to display board
3. Save

Use a dedicated group for each mic storage display.  Multiple **BLANK** boxes can be used to fill in unused spots.

## Background Images
<p align="center">
  <img width="60%" src="img/tv_imagebg.png"><img width="40%" src="img/smb_folder.png">
</p>

Image and video<sup>[1](#mp4)</sup> backgrounds can be used with Micboard. Files in the `backgrounds` folder of the micboard configuration directory are displayed based on the channel name. With backgrounds enabled, `01 Fatai` will display `fatai.jpg` as a background for the `01 Fatai` slot.



There are a few keyboard shortcuts to control background modes.
* <kbd>g</kbd> - Toggle image backgrounds
* <kbd>v</kbd> - Toggle video backgrounds


The micboard `backgrounds` folder can be shared via a fileserver.  This provides an easy way for teams to update pictures.

[Setting up a Fileserver for Micboard](fileshare.md)

## Extended Names
<p align="center">
  <img src="img/extended.png">
</p>

Larger systems benefit from static channel IDs like 'H01' or 'bp14' and user names, like Dave.  It can be difficult to fit both in a field Shure often limits to 8 characters.

Micboard has an optional feature called **Extended Names**.  When set, user-defined names will be displayed instead of names pulled from the receiver.

When the receiver name is changed via WWB, Micboard follows suit and displays the new name.

Press <kbd>n</kbd> to bring up the extended names editor.  Press save once complete.

#### Bulk Name Loader
Names can be imported from spreadsheets and text files with the **Bulk Loader**.
<p align="center">
  <img width="70%" src="img/bulkbox.png">
</p>

1. Open the Extended Names editor with <kbd>⇧ Shift</kbd> + <kbd>n</kbd>.
2. Paste a list of names into the bulk box.
3. Click **Load Bulk Names** to load names from the imported list.  Make any necessary edits in the extended editor and **Save**.

## Notes
<a name="mp4">1</a>: At this time, video backgrounds are only supported on Safari
