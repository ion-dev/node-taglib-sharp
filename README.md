# TagLib# for Node

Fork of [node-taglib-sharp](https://www.npmjs.com/package/node-taglib-sharp) with MP4 header fix

Recommended to backup your files first!

## Description


## Installation
```
npm install --save node-taglib-sharp
```

## Getting Started
Getting started with node-taglib-sharp is surprisingly easy. The main entry point into the library
is via the `File` class.

```typescript
import {File} from "node-taglib-sharp";

const myFile = File.createFromPath("path/to/my/file.mp3");
```

The `File` class provides factory methods for generating instances of classes that inherit from
`File` to provide implementation specific to a file format (such as `ApeFile` providing support
for Monkey's Audio files). The `File` class has exposes the `properties` and `tag` properties to
allow manipulation of the tagging information and reading audio/video properties. 

See the docs for [the File class](docs/classes/File.md) for complete details of the
available properties.

```typescript
console.log(myFile.properties.audioBitrate);
console.log(myFile.tag.title);
```

The `Tag` base class provides a tagging-format agnostic interface to modify tag(s) on the file
object. Set tag properties as needed and they will be stored in a tagging format that is supported
by the file type. The changes can be easily written back to the file with `save()`.

See the docs for [the Tag class](docs/classes/Tag.md) for complete details of the fields
supported by the format-agnostic `Tag` class. 

```typescript
myFile.tag.title = "Time Won't Let Me Go";
myFile.tag.album = "The Sun And The Moon";
myFile.tag.performers = ["The Bravery"];
myFile.save();
myFile.dispose();
```

## Known Issues
* Maximum supported file size is 8192TB
  - Why is this an issue? 8192TB is yuuuuge, but .NET implementation supports 8192PB file sizes.
  - The Node.js 12 [fs](https://nodejs.org/docs/latest-v12.x/api/fs.html) library only supports 
    `integer` types for position arguments, which safely goes up to `2^52 - 1`. Node 15 supports
    `number` or `biginteger` for position arguments which would increase supported sizes to 64-bit
    integers. Please create issue if this is a blocker.
