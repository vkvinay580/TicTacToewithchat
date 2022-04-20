package com.TicTacToe.controller.DataObject;

import com.TicTacToe.model.Player;
import lombok.Data;

@Data
public class Connection {
    private Player player;
    private String gameId;
}
