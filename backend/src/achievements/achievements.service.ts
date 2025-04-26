import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Achievement } from './entities/achievement.entity';
import { User } from '../users/entities/user.entity';
import { AchievementType } from '../common/enums/achievements-type.enum';
import { StarknetService } from 'src/starknet/starknet.service';
import { ProgressionHandler } from './handlers/progression-handler';
import { PerformanceHandler } from './handlers/performance-handler';
import { SpecialHandler } from './handlers/special-handler';
import { RareNFTHandler } from './handlers/rare-nft-handler';
import { CategoryHandler } from './handlers/category-mastery-handler';
import { CriteriaType } from 'src/common/enums/creteria-types.enum';
// import { WalletService } from 'src/starknet/wallet/wallet.service';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,


    private readonly starknetService: StarknetService,
    private readonly progressionHandler: ProgressionHandler,
    private readonly performanceHandler: PerformanceHandler,
    private readonly categoryHandler: CategoryHandler,
    private readonly specialHandler: SpecialHandler,
    private readonly rareNFTHandler: RareNFTHandler,
  ) {}

  //  Map achievement type to criteria
  private mapAchievementToCriteria(
    type: AchievementType,
  ): CriteriaType | undefined {
    switch (type) {
      case AchievementType.GAME_WIN:
        return CriteriaType.PROGRESSION;
      case AchievementType.HIGH_SCORE:
        return CriteriaType.PERFORMANCE;
      case AchievementType.STREAK:
        return CriteriaType.SPECIAL;
      case AchievementType.COLLECTION:
        return CriteriaType.CATEGORY_MASTERY;
      case AchievementType.BADGE:
        return CriteriaType.RARE_NFT;
      default:
        return undefined;
    }
  }

  //  Get all achievements for a user
  public async getUserAchievements(userId: number): Promise<Achievement[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    return this.achievementRepository.find({
      where: { user },
    });
  }

  //  Get progress for all achievements
  public async getAchievementProgress(userId: number) {
    const achievements = await this.getUserAchievements(userId);

    return achievements.map((achievement) => ({
      id: achievement.id,
      name: achievement.title,
      type: achievement.type,
      progress: achievement.progress || 0,
      target: achievement.target || 100,
      completionRate: Math.round(
        ((achievement.progress || 0) / (achievement.target || 1)) * 100,
      ),
      unlockedAt: achievement.unlockedAt,
    }));
  }

  //  Get NFT metadata for claimed achievements
  public async getUserNFTs(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const achievements = await this.achievementRepository.find({
      where: { user, unlockedAt: Not(undefined) },
    });

    return achievements.map((achievement) => ({
      achievementId: achievement.id,
      name: achievement.title,
      nftMetadata: achievement.nftTokenId,
    }));
  }

  //  Claim achievement and mint NFT
  public async claimAchievement(userId: number, achievementId: number) {
    const achievement = await this.achievementRepository.findOne({
      where: { id: achievementId, user: { id: userId } },
    });

    if (!achievement) {
      throw new NotFoundException('Achievement not found')
    };

    if (achievement.unlockedAt) {
      throw new Error('Achievement already claimed');
    }

    
    if (!achievement.unlockedAt) {
      achievement.unlockedAt = new Date();
      
      // Connect Wallet
    
      // Mint NFT
      const metadata = {
        title: achievement.title,
        description: achievement.description,
        imageUrl: achievement.nftTokenId,
      };

      const transactionHash = await this.starknetService.mintAchievementNFT(
        userId,
        metadata,
      );

      achievement.nftTokenId = transactionHash;
      await this.achievementRepository.save(achievement);
    }
  }

  //  Track achievement progress
  public async trackProgress(
    userId: number,
    type: AchievementType,
    progress: number,
    target: number,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const achievement = await this.achievementRepository.findOne({
      where: { user, type },
    });

    if (achievement) {
      achievement.progress = progress;
      achievement.target = target;

      if (progress >= target) {
        achievement.unlockedAt = new Date(); // Mark as completed
      }

      await this.achievementRepository.save(achievement);
    }
  }

  //  Award achievement and mint NFT
  public async awardAchievement(
    user: User,
    type: AchievementType,
    criteria: Record<string, any>,
  ) {
    const achievement = this.achievementRepository.create({
      user,
      type,
      title: this.getAchievementTitle(type),
      description: this.getAchievementDescription(type),
      criteria,
      unlockedAt: new Date(),
    });

    await this.achievementRepository.save(achievement);

    const metadata = {
      title: achievement.title,
      description: achievement.description,
      imageUrl: achievement.nftTokenId,
    };

    const transactionHash = await this.starknetService.mintAchievementNFT(
      user.id,
      metadata,
    );

    achievement.nftTokenId = transactionHash;
    await this.achievementRepository.save(achievement);
  }

  
  // Helpers for title and description
  private getAchievementTitle(type: AchievementType): string {
    const titles = {
      [CriteriaType.PROGRESSION]: 'Progression Achievement!',
      [CriteriaType.PERFORMANCE]: 'Performance Achievement!',
      [CriteriaType.CATEGORY_MASTERY]: 'Category Mastery!',
      [CriteriaType.SPECIAL]: 'Special Achievement!',
      [CriteriaType.RARE_NFT]: 'Rare NFT Achievement!',
    };
    return titles[type] || 'Achievement Earned!';
  }

  private getAchievementDescription(type: AchievementType): string {
    const descriptions = {
      [CriteriaType.PROGRESSION]: 'You unlocked a new progression achievement!',
      [CriteriaType.PERFORMANCE]: 'You unlocked a new performance achievement!',
      [CriteriaType.CATEGORY_MASTERY]:
        'You unlocked a new category achievement!',
      [CriteriaType.SPECIAL]: 'You unlocked a special achievement!',
      [CriteriaType.RARE_NFT]: 'You unlocked a rare NFT achievement!',
    };
    return descriptions[type] || 'Congratulations!';
  }
}
