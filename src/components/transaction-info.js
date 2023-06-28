import React from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function TransactionInfo({ txHash, txObject }) {
    if (!txObject) return null;

    const { blockTime, meta, slot, version } = txObject;
    return (
        <>
            <table className="transaction-table">
                <tbody>
                    {txHash && (
                        <tr>
                            <td className="table-label">Signature:</td>
                            <td id="tx-hash">{txHash}</td>
                        </tr>
                    )}
                    {blockTime && (
                        <tr>
                            <td className="table-label">Date / block time:</td>
                            <td>{new Date(blockTime * 1000).toLocaleString()} / {blockTime}</td>
                        </tr>
                    )}
                    {meta.err && (
                        <tr>
                            <td className="table-label">Transaction processing error:</td>
                            <td>
                                {meta.err ? "Error: " + meta.err.InstructionError[1] : "No errors, success!"}
                            </td>
                        </tr>
                    )}
                    {meta.computeUnitsConsumed && (
                        <tr>
                            <td className="table-label">Compute units consumed:</td>
                            <td>{meta.computeUnitsConsumed}</td>
                        </tr>
                    )}
                    {meta.fee && (
                        <tr>
                            <td className="table-label">Fee:</td>
                            <td>{meta.fee / LAMPORTS_PER_SOL} SOL</td>
                        </tr>
                    )}
                    {slot && (
                        <tr>
                            <td className="table-label">Slot:</td>
                            <td>{slot}</td>
                        </tr>
                    )}
                    {txObject && (
                        <tr>
                            <td className="table-label">Recent blockhash:</td>
                            <td>{txObject.transaction.message.recentBlockhash}</td>
                        </tr>
                    )}
                    {version && (
                        <tr>
                            <td className="table-label">Version:</td>
                            <td>{version}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TransactionInfo;