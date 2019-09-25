import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import SyncData from "../../src/id3v2/syncData";
import {ByteVector} from "../../src/byteVector";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

// Test Constants
const syncedUint = 0x2040810;
const syncedUintBytes = ByteVector.fromSize(4, 0x10);

@suite(timeout(3000), slow(1000))
class SyncDataTests {
    @test
    public fromUint_InvalidValues() {
        // Act/Assert
        assert.throws(() => { SyncData.fromUint(-1); });
        assert.throws(() => { SyncData.fromUint(1.5); });
        assert.throws(() => { SyncData.fromUint(Number.MAX_SAFE_INTEGER + 1); });
        assert.throws(() => { SyncData.fromUint(0xF0000000); });
    }

    @test
    public fromUint_Successful() {
        // Act
        const output = SyncData.fromUint(syncedUint);

        // Assert
        assert.isTrue(ByteVector.equal(output, syncedUintBytes));
    }

    @test
    public resyncByteVector_FalsyData() {
        // Act/Assert
        assert.throws(() => { SyncData.resyncByteVector(null); });
        assert.throws(() => { SyncData.resyncByteVector(undefined); });
    }

    // @TODO: resyncByteVector_validData

    @test
    public toUint_FalsyData() {
        // Act/Assert
        assert.throws(() => { SyncData.toUint(null); });
        assert.throws(() => { SyncData.toUint(undefined); });
    }

    @test
    public toUint_TooFewBytes() {
        // Arrange
        const input = ByteVector.fromSize(2, 0x10)

        // Act
        const output = SyncData.toUint(input);

        // Assert
        assert.equal(output, 0x810);
    }

    @test
    public toUint_TooManyBytes() {
        // Arrange
        const input = ByteVector.fromSize(6, 0x10);

        // Act
        const output = SyncData.toUint(input);

        // Assert
        assert.equal(output, syncedUint);
    }

    @test
    public toUint_JustRightBytes() {
        // Arrange
        const input = ByteVector.fromSize(4, 0x10);

        // Act
        const output = SyncData.toUint(input);

        // Assert
        assert.equal(output, syncedUint);
    }

    @test
    public unsyncByteVector_falsyData() {
        // Act/Assert
        assert.throws(() => { SyncData.unsyncByteVector(null); });
        assert.throws(() => { SyncData.unsyncByteVector(undefined); });
    }

    // @TODO: unsyncByteVector_validData
}
