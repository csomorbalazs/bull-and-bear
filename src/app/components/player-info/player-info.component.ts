import { Component, OnInit } from '@angular/core';
import { PlayerInfo } from 'src/app/models/PlayerInfo';
import { PlayerInfoService } from 'src/app/services/player-info.service';

@Component({
  selector: 'player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {
  currentPlayerInfo: PlayerInfo;

  constructor(private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    this.playerInfoService.playerInfoMessage.subscribe(playerInfo => {
      this.currentPlayerInfo = playerInfo;
    })
  }

}
