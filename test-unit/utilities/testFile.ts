import * as TypeMoq from "typemoq";

import {ByteVector} from "../../src/byteVector";
import {File} from "../../src/file";

export default {
    getFile: (data: ByteVector): File => {
        const mockFile = TypeMoq.Mock.ofType<File>();
        let position = 0;
        mockFile.setup((f) => f.seek(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAny()))
            .returns((p) => {
                position = p;
            });
        mockFile.setup((f) => f.readBlock(TypeMoq.It.isAnyNumber()))
            .returns((s) => {
                if (position + s > data.length) {
                    s = data.length - position;
                }
                if (s <= 0) {
                    return ByteVector.empty();
                }
                return data.mid(position, s);
            });

        return mockFile.object;
    }
};
