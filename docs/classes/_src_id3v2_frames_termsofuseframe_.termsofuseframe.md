**node-taglib-sharp**

> [README](../README.md) / [Globals](../globals.md) / ["src/id3v2/frames/termsOfUseFrame"](../modules/_src_id3v2_frames_termsofuseframe_.md) / TermsOfUseFrame

# Class: TermsOfUseFrame

## Hierarchy

* [Frame](_src_id3v2_frames_frame_.frame.md)

  ↳ **TermsOfUseFrame**

## Index

### Properties

* [\_header](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#_header)

### Accessors

* [encryptionId](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#encryptionid)
* [flags](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#flags)
* [frameClassType](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#frameclasstype)
* [frameId](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#frameid)
* [groupId](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#groupid)
* [language](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#language)
* [size](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#size)
* [text](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#text)
* [textEncoding](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#textencoding)

### Methods

* [clone](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#clone)
* [fieldData](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#fielddata)
* [parseFields](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#parsefields)
* [render](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#render)
* [renderFields](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#renderfields)
* [setData](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#setdata)
* [toString](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#tostring)
* [correctEncoding](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#correctencoding)
* [find](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#find)
* [findPreferred](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#findpreferred)
* [fromFields](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#fromfields)
* [fromOffsetRawData](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#fromoffsetrawdata)
* [fromRawData](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md#fromrawdata)

## Properties

### \_header

• `Protected` **\_header**: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[_header](_src_id3v2_frames_frame_.frame.md#_header)*

*Defined in src/id3v2/frames/frame.ts:33*

## Accessors

### encryptionId

• get **encryptionId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

*Defined in src/id3v2/frames/frame.ts:55*

Gets the encryption ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the encryption identifer for the current instance or
    `undefined` if not set.

• set **encryptionId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[encryptionId](_src_id3v2_frames_frame_.frame.md#encryptionid)*

*Defined in src/id3v2/frames/frame.ts:65*

Sets the encryption ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Value containing the encryption identifier for the current instance. Must be an     8-bit unsigned integer. Setting to `undefined` will remove the encryption header and ID  |

**Returns:** void

number Value containing the encryption identifer for the current instance or
    `undefined` if not set.

___

### flags

• get **flags**(): [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

*Defined in src/id3v2/frames/frame.ts:78*

Gets the frame flags applied to the current instance.

**Returns:** [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)

• set **flags**(`value`: [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md)): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[flags](_src_id3v2_frames_frame_.frame.md#flags)*

*Defined in src/id3v2/frames/frame.ts:84*

Sets the frame flags applied to the current instance.
If the value includes either {@see Id3v2FrameFlags.Encryption} or
{@see Id3v2FrameFlags.Compression}, {@see render} will throw.

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Id3v2FrameFlags](../enums/_src_id3v2_frames_frameheader_.id3v2frameflags.md) |

**Returns:** void

___

### frameClassType

• get **frameClassType**(): [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[frameClassType](_src_id3v2_frames_frame_.frame.md#frameclasstype)*

*Defined in src/id3v2/frames/termsOfUseFrame.ts:81*

**`inheritdoc`** 

**Returns:** [FrameClassType](../enums/_src_id3v2_frames_frame_.frameclasstype.md)

___

### frameId

• get **frameId**(): [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[frameId](_src_id3v2_frames_frame_.frame.md#frameid)*

*Defined in src/id3v2/frames/frame.ts:92*

Gets the frame ID for the current instance.

**Returns:** [FrameIdentifier](_src_id3v2_frameidentifiers_.frameidentifier.md)

FrameIdentifier Object representing of the identifier of the frame

___

### groupId

• get **groupId**(): number \| undefined

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

*Defined in src/id3v2/frames/frame.ts:99*

Gets the grouping ID applied to the current instance.

**Returns:** number \| undefined

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

• set **groupId**(`value`: number \| undefined): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[groupId](_src_id3v2_frames_frame_.frame.md#groupid)*

*Defined in src/id3v2/frames/frame.ts:109*

Sets the grouping ID applied to the current instance.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | number \| undefined | Grouping identifier for the current instance. Must be a 8-bit unsigned integer.     Setting to `undefined` will remove the grouping identity header and ID  |

**Returns:** void

number Value containing the grouping identifier for the current instance, or
    `undefined` if not set.

___

### language

• get **language**(): string

*Defined in src/id3v2/frames/termsOfUseFrame.ts:86*

Gets the ISO-639-2 language code stored in the current instance.

**Returns:** string

• set **language**(`value`: string): void

*Defined in src/id3v2/frames/termsOfUseFrame.ts:95*

Sets the ISO-639-2 language code stored in the current instance.
There should only be one frame with a matching ISO-639-2 language code per tag.

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### size

• get **size**(): number

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[size](_src_id3v2_frames_frame_.frame.md#size)*

*Defined in src/id3v2/frames/frame.ts:124*

Gets the size of the current instance as it was last stored on disk.
NOTE: This value is not used outside of reading a frame from disk, so newly created frames
    should not have this value set.

**Returns:** number

___

### text

• get **text**(): string

*Defined in src/id3v2/frames/termsOfUseFrame.ts:100*

Gets the text of the terms of use

**Returns:** string

• set **text**(`value`: string): void

*Defined in src/id3v2/frames/termsOfUseFrame.ts:104*

Sets the text of the terms of use

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** void

___

### textEncoding

• get **textEncoding**(): [StringType](../enums/_src_bytevector_.stringtype.md)

*Defined in src/id3v2/frames/termsOfUseFrame.ts:109*

Gets the text encoding to use when storing the current instance.

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

• set **textEncoding**(`value`: [StringType](../enums/_src_bytevector_.stringtype.md)): void

*Defined in src/id3v2/frames/termsOfUseFrame.ts:116*

Sets the text encoding to use when storing the current instance.
This encoding is overridden when rendering if {@see Id3v2Tag.forceDefaultEncoding} is `true`
or the render version does not support it.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [StringType](../enums/_src_bytevector_.stringtype.md) | Text encoding to use when storing the current instance  |

**Returns:** void

## Methods

### clone

▸ **clone**(): [Frame](_src_id3v2_frames_frame_.frame.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[clone](_src_id3v2_frames_frame_.frame.md#clone)*

*Defined in src/id3v2/frames/termsOfUseFrame.ts:159*

**`inheritdoc`** 

**Returns:** [Frame](_src_id3v2_frames_frame_.frame.md)

___

### fieldData

▸ `Protected`**fieldData**(`frameData`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[fieldData](_src_id3v2_frames_frame_.frame.md#fielddata)*

*Defined in src/id3v2/frames/frame.ts:229*

Extracts the field data from the raw portion of an ID3v2 frame.
This method is necessary for extracting extra data prepended to the frame such the as
grouping ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frameData` | [ByteVector](_src_bytevector_.bytevector.md) | Raw frame data |
`offset` | number | Index at which the data is contained |
`version` | number | Version of the ID3v2 tag the data was originally encoded with  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### parseFields

▸ `Protected`**parseFields**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): void

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[parseFields](_src_id3v2_frames_frame_.frame.md#parsefields)*

*Defined in src/id3v2/frames/termsOfUseFrame.ts:175*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) |
`version` | number |

**Returns:** void

___

### render

▸ **render**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[render](_src_id3v2_frames_frame_.frame.md#render)*

*Defined in src/id3v2/frames/frame.ts:140*

Renders the current instance, encoded in a specified ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`version` | number | Version of ID3v2 to use when encoding the current instance  |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### renderFields

▸ `Protected`**renderFields**(`version`: number): [ByteVector](_src_bytevector_.bytevector.md)

*Overrides [Frame](_src_id3v2_frames_frame_.frame.md).[renderFields](_src_id3v2_frames_frame_.frame.md#renderfields)*

*Defined in src/id3v2/frames/termsOfUseFrame.ts:186*

**`inheritdoc`** 

#### Parameters:

Name | Type |
------ | ------ |
`version` | number |

**Returns:** [ByteVector](_src_bytevector_.bytevector.md)

___

### setData

▸ `Protected`**setData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `readHeader`: boolean, `version`: number): void

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[setData](_src_id3v2_frames_frame_.frame.md#setdata)*

*Defined in src/id3v2/frames/frame.ts:299*

Populates the current instance by reading the raw frame from disk, optionally reading the
header.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw ID3v2 frame |
`offset` | number | Offset in {@paramref data} at which the frame begins. |
`readHeader` | boolean | Whether or not to read the reader into the current instance. |
`version` | number | Version of the ID3v2 tag the data was encoded with  |

**Returns:** void

___

### toString

▸ **toString**(): string

*Defined in src/id3v2/frames/termsOfUseFrame.ts:168*

Returns a string representation of the frame.

**Returns:** string

___

### correctEncoding

▸ `Static` `Protected`**correctEncoding**(`type`: [StringType](../enums/_src_bytevector_.stringtype.md), `version`: number): [StringType](../enums/_src_bytevector_.stringtype.md)

*Inherited from [Frame](_src_id3v2_frames_frame_.frame.md).[correctEncoding](_src_id3v2_frames_frame_.frame.md#correctencoding)*

*Defined in src/id3v2/frames/frame.ts:209*

Converts an encoding to be a supported encoding for a specified tag version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [StringType](../enums/_src_bytevector_.stringtype.md) | Value containing the original encoding |
`version` | number | Value containing the ID3v2 version to be encoded. |

**Returns:** [StringType](../enums/_src_bytevector_.stringtype.md)

StringType Value containing the correct encoding to use, based on
    {@see Id3v2Settings.forceDefaultEncoding} and what is supported by
    {@paramref version}

___

### find

▸ `Static`**find**(`frames`: [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)[], `language?`: string): [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

*Defined in src/id3v2/frames/termsOfUseFrame.ts:129*

Gets a specified terms of use frame from the list of frames

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)[] | List of frames to search |
`language?` | string | Optionally, the ISO-639-2 language code to match |

**Returns:** [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

TermsOfUseFrame A matching frame if found or `undefined` if a matching frame was
    not found

___

### findPreferred

▸ `Static`**findPreferred**(`frames`: [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)[], `language`: string): [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

*Defined in src/id3v2/frames/termsOfUseFrame.ts:142*

Gets a specified terms of use frame from the list of frames, trying to match the language but
accepting one with a different language if a match was not found.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`frames` | [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)[] | List of frames to search |
`language` | string | ISO-639-2 language code to match |

**Returns:** [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

TermsOfUseFrame Frame containing the matching frame or `undefined` if a match was
    not found

___

### fromFields

▸ `Static`**fromFields**(`language`: string, `textEncoding`: [StringType](../enums/_src_bytevector_.stringtype.md)): [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

*Defined in src/id3v2/frames/termsOfUseFrame.ts:26*

Constructs and initializes a new instance with a specified language.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`language` | string | - | ISO-639-2 language code for the new frame |
`textEncoding` | [StringType](../enums/_src_bytevector_.stringtype.md) | Id3v2Settings.defaultEncoding | Optional, text encoding to use when rendering the new frame. If not     provided defaults to {@see Id3v2Settings.defaultEncoding}  |

**Returns:** [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

___

### fromOffsetRawData

▸ `Static`**fromOffsetRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `offset`: number, `header`: [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md), `version`: number): [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

*Defined in src/id3v2/frames/termsOfUseFrame.ts:45*

Constructs and initializes a new instance by reading its raw data in a specified ID3v2
version. This method allows for offset reading from the data bytevector.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`offset` | number | What offset in {@paramref data} the frame actually begins. Must be positive,     safe integer |
`header` | [Id3v2FrameHeader](_src_id3v2_frames_frameheader_.id3v2frameheader.md) | Header of the frame found at {@paramref data} in the data |
`version` | number | ID3v2 version the frame was originally encoded with  |

**Returns:** [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

___

### fromRawData

▸ `Static`**fromRawData**(`data`: [ByteVector](_src_bytevector_.bytevector.md), `version`: number): [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)

*Defined in src/id3v2/frames/termsOfUseFrame.ts:67*

Constructs and initializes a new instance by reading its raw data in a specified
ID3v2 version.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | [ByteVector](_src_bytevector_.bytevector.md) | Raw representation of the new frame |
`version` | number | ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer  |

**Returns:** [TermsOfUseFrame](_src_id3v2_frames_termsofuseframe_.termsofuseframe.md)